import Vue from './vue'
// 挂载$mount方法源码在platforms/web/runtime/index中挂载接受两个参数el和hydrating，
Vue.prototype.$mount = function (el) {
  el = el ? query(el) : undefined;
  // mountComponent在core/instance/lifecycle中实现咱们直接在mount文件中写一个mountComponent的方法
  return mountComponent(this, el)
}
// 再次重写$mount方法切面编程
const mount = Vue.prototype.$mount;
export default mount;
/**此方法主要是对template的扩展和兼容 */
Vue.prototype.$mount = function(el) {
  el = el && query(el);
  // 判断是不是顶级元素给出警告
  if (el === document.body || el === document.documentElement) {
    console.warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }
  const options = this.$options
  // 没有render的情况下
  if (!options.render) {
    // 判断有没有模板template
    let template = options.template;
    if (template) {
      // 模板暂不处理 大概说一下 
      if (typeOf template === 'String') {
        // 首先判断模板是不String
        if (template.charAt(0) === '#') {
          // 在进行判断传的是不是id 调用idToTemplate方法
        } else if (template.nodeType) {
          // 判断有没有子元素有的话直接拿到template.innerHTML的内容
        } else {
          // 给出警告
          return this;
        }
      }
    } else if (el) {
      // 有el进行处理
      template = getOuterHTML(el)
    }
    if (template) {
      // 在进行一系列处理，主要是获取render方法
      // const { render, staticRenderFns } = compileToFunctions(template, {
      // }, this)
      // options.render = render
      // options.staticRenderFns = staticRenderFns
    }
  }
  return mount.call(this, el)
}
// query方法
function query (el) {
  // 如果是dom对象直接返回是字符串找到传入的dom元素返回
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected) {
      // 判断线上环境找不到给出警告，并创建div
      // process.env.NODE_ENV !== 'production' && warn(
      //   'Cannot find element: ' + el
      // )
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}
function mountComponent(vm, el) {
  vm.$el = el;
  // 判断有没有render方法
  if (!vm.$options.render) {
    // createEmptyVNode方法在core/vdeom/vnode中实现返回VNode虚拟dom
    vm.$options.render = createEmptyVNode
  } 
  // 生命周期
  // callHook(vm, 'beforeMount')
  // 声明更新变量
  let updateComponent;
  // 源码进行了判断优化暂时不考虑
  updateComponent = () => {
    vm._update(vm._render())
  }
  // new Watch进行监听是否更新组件，触发beforeUpdate声明周期，暂不实现
  if (vm.$vnode == null) {
    // callHook(vm, 'Mounteed')
  }
  return vm;
}
function createEmptyVNode() {
  const node = new VNode()
  // 对node返回对象赋值
  return node
}
class VNode {
  // 虚拟dom
  constructor(tag, data, value, type) {
      this.tag = tag && tag.toLowerCase();
      this.data = data;
      this.value = value;
      this.type = type;
      this.children = [];
  }
  append(vnode) {
    this.children.push(vnode)
  }
}
function getOuterHTML(el) {
  // 获取自身元素和子元素，元素没有的话创建div并拷贝el内容append到创建的div中
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}