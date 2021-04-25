export class Observe {
  constructor(value) {
    // 执行了Dep暂不处理
  }

}
export function observe() {

}
export function defineReactive(obj, key, value) {
  // 数据劫持
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return value;
    },
    set: function(val) {
      value = val;
      // 触发视图更新
    }
  })
}