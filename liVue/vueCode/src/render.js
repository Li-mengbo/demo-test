// src/render.js
// core/instance/render
export function renderMixin(Vue) {
  // installRenderHelpers(Vue.prototype)
  // 绑定target._v = createTextVNode等一些方法可以查看源码core/instance/render-helpers/index
  // 源码进行一系列处理和判断在这里简单处理
  Vue.prototype._render = function () {
    const vm = this;
    // 获取模板编译生成的render方法
    const { render } = vm.$options;
    // 生成vnode--虚拟dom
    const vnode = render.call(vm);
    return vnode;
  };
}
export function initRender(vm) {
    // render函数里面有_c _v _s方法需要定义
    vm._c = function (a, b, c, d) => createElement(vm, a, b, c, d);
    vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d)
}
function createElement(context, tag, data, children, normalizationType) {
  // 进行了一系列判断在这里直接简写
  return _createElement(context, tag, data, children, normalizationType)
}
function _createElement(context, tag, data, children, normalizationType) {
  // 进行了一系列判断
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is
  }
  // 创建VNode
  if (!tag) {
    return createEmptyVNode()
  }
  let vnode, ns
  if (typeof tag === 'string') {
    let Ctor
    // 如果有vnode直接取出vnode中的ns
    ns = (context.$vnode && context.$vnode.ns)
    if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      )
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children)
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) applyNS(vnode, ns)
    if (isDef(data)) registerDeepBindings(data)
    return vnode
  } else {
    return createEmptyVNode()
  }
}
function createTextVNode() {
  return new VNode(undefined, undefined, undefined, String(val))
}

