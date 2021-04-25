import { initState } from './state.js'
export function initMinxin(Vue){
  Vue.prototype._init = function(options) {
    const vm = this;
    vm.$options = options;
    vm._self = vm;
    initState(vm);
  }
};