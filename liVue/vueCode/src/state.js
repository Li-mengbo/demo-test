import {
  observe,
  defineReactive
} from './observe';
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: function() {},
  set: function() {}
}
export function initState(vm) {
  const opts = vm.$options
  if (opts.data) {
    initData(vm)
  } else {
    // 没有data创建一个空对象并且通过defineProperty监听变化方法是observe
    observe({})
  }
  /**以下方法都咱不实现 */
  // 如果有组件属性props则初始化组件属性（接收父组件的传过来的参数哦）
  if (opts.props) {
    // 暂不实现
  }
  // 如果有方法属性mothods则初始化方法属性
  if (opts.methods) {
    // 暂不实现
  }
  // 如果有计算属性computed则初始化计算属性
  if (opts.computed) {
    // 暂不实现
  }
  // 如果有watch添加watch监听
  if (opts.watch) {
    // 暂不实现
  }
}
// 等价于demo07里的proxy方法
export function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function() {
    console.log()
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function(val) {
    this[sourceKey][key] = val;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
function initData(vm) {
  let data = vm.$options.data;
  // 判断是不是对象的形式暂不处理只考虑是对象
  // data = vm._data = typeOf data === 'function'
  data = vm._data =  data || {};
  const keys = Object.keys(data);
  let i = keys.length;
  while(i--) {
    const key = keys[i];
    // 真实Vue处理了data中的key值与props和methods是否相等，相等的话给出警告,暂不考虑
    // 把data的值分别绑定到vue实例上并且通过_data可以访问也可以通过vue.XX访问
    proxy(vm, `_data`, key)
  }
  // 第二个值是bool值暂不实现说明一下可以用来
  observe(data);
}