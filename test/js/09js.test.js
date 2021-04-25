var test = require('../../js/09/index');
var expect = require('chai').expect;
describe('两个变量值是否相等测试', function() {
  var foo1 = {
    a: 1,
    b: "1",
    c: NaN,
    d: [
      {
        a: 1,
        b: 2,
      },
    ],
    f: {
      a: 1,
    },
    g: null
  }; 
  var foo2 = {
    a: 1,
    b: "1",
    c: NaN,
    d: [
      {
        a: 1,
        b: 2,
      },
    ],
    f: {
      a: 1,
    },
    g: null
  };
  it('两个对象相等', () => {
    expect(test.isEqual(foo1, foo2)).to.be.ok;
  })
})
describe('测试获取path的值', function() {
  var object = { a: [{ b: { c: 3 } }] }; // path: 'a[0].b.c'
  var array = [{ a: { b: [1] } }]; // path: '[0].a.b[0]'
  it('获取object的值', () => {
    expect(test.getValue(object, "a[0].b.c", 0)).to.deep.equal(3);
  })
  it('获取Array中的值', () => {
    expect(test.getValue(array, "[0].a.b[0]", 12)).to.deep.equal(1);
  })
  it('获取不到值返回填写的默认值', () => {
    expect(test.getValue(array, "[0].a.b[0].c", 12)).to.deep.equal(12);
  })
})
describe('测试plus方法', function() {
  it('plus(0).toString() === 0', () => {
    expect(test.plus(0).toString()).to.deep.equal(0);
  })
  it('plus(1)(2).toSting() === 3', () => {
    expect(test.plus(1)(2).toString()).to.deep.equal(3);
  })
  it('plus(1,1)(2,2)(3).toSting() === 9', () => {
    expect(test.plus(1,1)(2,2)(3).toString()).to.deep.equal(9);
  })
})