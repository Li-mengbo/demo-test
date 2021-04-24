var test = require('./test.js');
// BDD: expect
var expect = require('chai').expect;
// TDD: assert 不常用
// var assert = require('chai').assert;
Function.prototype.myBindsEs6 = test.myBindsEs6
Function.prototype.myCallEs6 = test.myCallEs6;
Function.prototype.myCallEs5 = test.myCallEs5;
Function.prototype.myApplyEs6 = test.myApplyEs6;
Function.prototype.myApplyEs5 = test.myApplyEs5;
describe('手写bind测试', function() {
  it('this绑定成功', () => {
    var obj = {name: 1};
    function fn() {
      return this;
    }
    var fn1 = fn.myBindsEs6(obj)
    // assert.deepStrictEqual(newFn(), {name: 1});
    expect(fn1()).to.deep.equal({name: 1});
  });
  it('值绑定成功', () => {
    var obj = {name: 1};
    function fn(a, b, c) {
      return [this, a, b, c];
    }
    var fn1 = fn.myBindsEs6(obj, 1, 2);
    expect(fn1(3)).to.deep.equal([obj, 1, 2, 3]);
  });
  it('可以通过new实例化', () => {
    var obj = {};
    function Fn(x, y) {
      this.x = x;
      this.y = y;
    }
    var f1 = Fn.myBindsEs6(obj, 1, 2);
    var newFn = new f1();
    expect(newFn).to.deep.equal({x: 1, y: 2});
  });
  it('newFn是Fn的实例', () => {
    var obj = {};
    function Fn(x, y) {
      this.x = x;
      this.y = y;
    }
    var f1 = Fn.myBindsEs6(obj, 1, 2);
    var newFn = new f1();
    expect(Fn.prototype.isPrototypeOf(newFn)).to.be.true;
  });
});
describe('手写call测试', function() {
  it('call es5和es6写法可以运行成功并改变this', () => {
    var obj = {name: 1};
    function fn(a,b) {
      return [this.name, 2, 3];
    }
    expect(fn.myCallEs6(obj, 2, 3)).to.deep.equal([1, 2, 3])
    expect(fn.myCallEs5(obj, 2, 3)).to.deep.equal([1, 2, 3]);
  })
})
describe('手写apply测试', function() {
  it('apply es5和es6写法可以运行成功并改变this', () => {
    var obj = {name: 1};
    function fn(a,b) {
      return [this.name, 2, 3];
    }
    expect(fn.myApplyEs6(obj, [2, 3])).to.deep.equal([1, 2, 3])
    expect(fn.myApplyEs5(obj, [2, 3])).to.deep.equal([1, 2, 3]);
  })
})