import { initState } from './state.js'
export function initMixin(Vue){
  Vue.prototype._init = function(options) {
    const vm = this;
    // Vue源码对_isComponent进行了判断而且源码options调用了mergeOptions方法可以看core/instance/init.js
    vm.$options = options;
    vm._self = vm;
    // 初始化state方法对Vue上的值进行响应式，并且重写数组方法，而且把data上的值绑定到Vue实例上另外还初始化了一些其他的方法
    // 可以查看源码实现暂不考虑以后用到之后在考虑
    initState(vm);
    // 如果options上有el属性调用$mount方法$mount挂载在了vue.prototype上
    if (vm.$options.el) {
        vm.$mount(vm.$options.el)
    }
  }
};