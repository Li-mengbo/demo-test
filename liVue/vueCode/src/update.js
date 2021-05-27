export function lifecycleMixin(Vue) {
  Vue.prototyps._update = function(VNode) {
    const vm = this
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    vm._vnode = vnode
    // vm.__patch__实际上就是patch方法Vue对其进行了判断位置在src/platforms/web/runtime/index.js
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el
    }
  }
}
// patch方法位置在src/platforms/web/runtime/patch.js
const patch = createPatchFunction({ nodeOps, modules })
// createPatchFunction方法位置在src/core/vdom/patch.js
function createPatchFunction(backend) {
  const cbs = {}
  const { modules, nodeOps } = backend
  // 虚拟dom转换为真实的dom
  function createElm(vnode) {
    let { tag, data, key, children, text } = vnode;
    //   判断虚拟dom 是元素节点还是文本节点
    if (typeof tag === "string") {
      //   虚拟dom的el属性指向真实dom
      vnode.el = document.createElement(tag);
      // 解析虚拟dom属性
      updateProperties(vnode);
      // 如果有子节点就递归插入到父节点里面
      children.forEach((child) => {
        return vnode.el.appendChild(createElm(child));
      });
    } else {
      //   文本节点
      vnode.el = document.createTextNode(text);
    }
    return vnode.el;
  }
  // 解析vnode的data属性 映射到真实dom上
  function updateProperties(vnode) {
    let newProps = vnode.data || {};
    let el = vnode.el; //真实节点
    for (let key in newProps) {
      // style需要特殊处理下
      if (key === "style") {
        for (let styleName in newProps.style) {
          el.style[styleName] = newProps.style[styleName];
        }
      } else if (key === "class") {
        el.className = newProps.class;
      } else {
        // 给这个元素添加属性 值就是对应的值
        el.setAttribute(key, newProps[key]);
      }
    }
  }
  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    // isUndef判断传入的值是undefined或者null返回true
    if (isUndef(vnode)) {
      // isDef判断传入的值是undefined或者null返回false
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }

    let isInitialPatch = false
    const insertedVnodeQueue = []
    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true
      createElm(vnode, insertedVnodeQueue)
    } else {
      const isRealElement = isDef(oldVnode.nodeType)
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
      } else {
        // oldVnode.nodeType不为undefined和null返回true
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR)
            hydrating = true
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true)
              return oldVnode
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode)
        }

        // replacing existing element
        const oldElm = oldVnode.elm
        const parentElm = nodeOps.parentNode(oldElm)

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        )

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          let ancestor = vnode.parent
          const patchable = isPatchable(vnode)
          while (ancestor) {
            for (let i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor)
            }
            ancestor.elm = vnode.elm
            if (patchable) {
              for (let i = 0; i < cbs.create.length; ++i) {
                cbs.create[i](emptyNode, ancestor)
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              const insert = ancestor.data.hook.insert
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (let i = 1; i < insert.fns.length; i++) {
                  insert.fns[i]()
                }
              }
            } else {
              registerRef(ancestor)
            }
            ancestor = ancestor.parent
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0)
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode)
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    return vnode.elm
  }
}
