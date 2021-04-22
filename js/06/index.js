/**
 * 手撕代码系列
 */
// 实现call和apply
// es6 call
Function.prototype.myCall = function(self, ...arg) {
  self = self || window;
  const fn = Symbol('临时值')
  self[fn] = this;
  self[fn](...arg);
  delete fn;
}
// es5 call
Function.prototype.myCall = function(self) {
  self = self || window;
  self.fn = this;
  var args = [];
  for(var i = 1,len = arguments.length; i < len; i++){
      args.push('arguments['+i+']');
  }
  eval('self.fn('+args+')')
  delete self.fn;
}
// es6 applay
Function.prototype.myApply = function(self, arg) {
  self = self || window;
  const fn = Symbol('临时值')
  self[fn] = this;
  self[fn](...arg);
  delete self[fn];
}
// es5 apply
Function.prototype.myApply = function(self) {
  self = self || window;
  self.fn = this;
  eval('self.fn('+arguments[1]+')')
  delete self.fn;
}

