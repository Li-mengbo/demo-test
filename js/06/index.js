/**
 * 手撕代码系列
 */
// 实现call和apply
// es6 call
Function.prototype.myCallEs6 = function(self, ...arg) {
  self = self || window;
  const fn = Symbol('临时值')
  self[fn] = this;
  self[fn](...arg);
  var rest = self[fn](...arg);
  delete fn;
  return rest;
}
// es5 call
Function.prototype.myCallEs5 = function(self) {
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
// es6 applay
Function.prototype.myApplyEs6 = function(self, arg) {
  self = self || window;
  const fn = Symbol('临时值')
  self[fn] = this;
  const rest = self[fn](...arg);
  delete self[fn];
  return rest;
}
// es5 apply
Function.prototype.myApplyEs5 = function(self) {
  self = self || window;
  self.fn = this;
  var rest = eval('self.fn('+arguments[1]+')')
  delete self.fn;
  return rest;
}

// 丐版bind es6
Function.prototype.myBindEs6 = function(self, ...args){
  // 不是箭头函数会有新的this所以把当前this赋值为that
  const that = this;
  const bindFn = function(...rest) {
    return that.call(self, ...args, ...rest)
  }
  bindFn.prototype = Object.create(that.prototype)
  return bindFn;
}
// 丐版bind es5
Function.prototype.myBindEs5 = function(self){
  var args = [].slice.call(arguments, 1)
  // 不是箭头函数会有新的this所以把当前this赋值为that
  var that = this;
  const bindFn = function() {
    var rest = [].slice.call(arguments);
    return that.apply(self, args.concat(rest))
  }
  bindFn.prototype = Object.create(that.prototype)
  return bindFn;
}
/**真实的bind支持new操作符调用需要改写 例如：*/
/**
function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.toString = function() {
  return this.x + ',' + this.y;
}
var p = new Point(1, 2);
p.toString(); // '1,2'
var emptyObj = {};
var p1 = Point.bind(emptyObj, 0);
p1(12)
console.log(emptyObj); // {x: 0, y: 12}
p1.toString() //返回对象上的toString
// 实际应该是
var newP1 = new p1(12);
newP1.toString(); //0, 12
*/
// 标配版bind es5
Function.prototype.myBindsEs5 = function(self){
  var args = [].slice.call(arguments, 1)
  // 不是箭头函数会有新的this所以把当前this赋值为that
  var that = this;
  const bindFn = function() {
    var rest = [].slice.call(arguments);
    // 判断是否通过new运行
    const isNew = this instanceof bindFn;
    // resultFn.prototype 是否存在于this的原型链上
    // const isNew = resultFn.prototype.isPrototypeOf(this)
    self = isNew ? this : self;
    return that.apply(self, args.concat(rest))
  }
  bindFn.prototype = Object.create(that.prototype)
  return bindFn;
}
// 标配版bind es6
Function.prototype.myBindsEs6 = function(self, ...args){
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
// 实现create
// 实现new
function newFn(fn, ...arg) {
  const fn1 = Object.create(fn.prototype); // 继承fn.prototype被创建
  const fn2 = fn.apply(fn1, arg); // 改变上下文的指向
  return  typeof fn2 === "object" ? fn2 : fn1;
}
