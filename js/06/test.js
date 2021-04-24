function myBindsEs6(self, ...args){
  // 不是箭头函数会有新的this所以把当前this赋值为that
  const that = this;
  const bindFn = function(...rest) {
    // 判断是否通过new运行
    const isNew = this instanceof bindFn;
    // resultFn.prototype 是否存在于this的原型链上
    // const isNew = resultFn.prototype.isPrototypeOf(this)
    self = isNew ? this : self;
    return that.call(self, ...args, ...rest)
  }
  bindFn.prototype = Object.create(that.prototype)
  return bindFn;
}
function myCallEs6 (self, ...arg) {
  self = self || window;
  const fn = Symbol('临时值')
  self[fn] = this;
  var rest = self[fn](...arg);
  delete fn;
  return rest;
}
function myCallEs5(self) {
  self = self || window;
  self.fn = this;
  var args = [];
  for(var i = 1,len = arguments.length; i < len; i++){
      args.push('arguments['+i+']');
  }
  var rest = eval('self.fn('+args+')');
  delete self.fn;
  return rest;
}
function myApplyEs6 (self, arg) {
  self = self || window;
  const fn = Symbol('临时值')
  self[fn] = this;
  const rest = self[fn](...arg);
  delete self[fn];
  return rest;
}
function myApplyEs5 (self) {
  self = self || window;
  self.fn = this;
  var rest = eval('self.fn('+arguments[1]+')')
  delete self.fn;
  return rest;
}
module.exports = {
  myBindsEs6,
  myCallEs6,
  myCallEs5,
  myApplyEs6,
  myApplyEs5
}