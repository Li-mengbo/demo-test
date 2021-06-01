import { isObject } from './utils'
import Dep from './dep';
// 重写数组方法
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
const arrayMethods = Object.create(Array.prototype)
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayMethods[method];
  arrayMethods[method] = function(...args) {
    // 切面编程详情可以查看js文件夹04文件
    const result = original.apply(this, args)
    // 数组响应式this.__ob__就是Observer
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // dep监听暂不处理
    ob.dep.notify()
    return result;
  }
})
// 给对象上增加一个__ob__的属性值是Observer实例化的对象
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

export class Observer {
  constructor(value) {
    // 执行了Dep暂不处理
    this.dep = new Dep()
    this.value = value;
    def(value, '__ob__', this);
    if(Array.isArray(value)) {
      this.observeArray(value)
      // 改写data上数组原型链上的方法Vue里进行了判断'__proto__' in {}判断是否有原型链在这里不进行处理
      value.__proto__ = arrayMethods
    } else {
      this.walk(value);
    }
  }
  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = obj[key]
      defineReactive(obj, key, value) // 真实valu支持传入两个值defineReactive做了处理
    }
  }
  observeArray(obj) {
    obj.forEach(item => {
      observe(item)
    })
  }
}
export function observe(value) {
  // 首先判断value是不是一个对象
  if (!isObject(value)) {
    return;
  }
  let ob;
  // 源码中做了多个判断在这里啊简单实现
  if (Array.isArray(value) || Object.prototype.toString.call(value) === "[object Object]") {
    ob = new Observer(value);
  }
  return ob;
}
export function defineReactive(obj, key, value) {
  const dep = new Dep();
  if(typeof obj === "object"  && obj != null ) {
    let childOb = observe(value)
  }
  // 数据劫持
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      if (dep.target) {
        dep.depend()
      }
      if (childOb) {
        childOb.dep.depend()
        if (Array.isArray(value)) {
          dependArray(value)
        }
      }
      console.log('获取值', key)
      return value;
    },
    set: function(val) {
      console.log('更新值', key)
      if ( value === val ) return;
      // 直接修改值为对象
      if (Object.prototype.toString.call(val) === '[object Object]') {
        observe(val);
      }
      value = val;
      // 触发视图更新
      dep.notify();
    }
  })
}
// 数组的依赖收集
function dependArray (value) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}
