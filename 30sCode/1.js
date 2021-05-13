/**
 * object变成对象并且可以使用对象的方法
 * 使用 new proxy进行代理
 */
const toKeyedArray = obj => {
    const mounts = {
      splice: () => {},
      forEach(target) {
        return callback =>
        Object.keys(target).forEach(key => callback(target[key],key));
      }
    }
    const mountsArr = Object.keys(mounts)
    const handler = {
      get: function(target, property, receiver) {
          if (property === 'keys') return Object.keys(target)
          if (mountsArr.includes(property)) return mounts[property](...arguments);
      }
    };
    return new Proxy(obj, handler)
}
const arr = toKeyedArray({a: 1, b:2})
arr.forEach((item, index) => {
  console.log(item, index)
});
