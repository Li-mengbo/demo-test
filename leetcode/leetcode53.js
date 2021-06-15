/**
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
 * 输出：6
 * 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
 * 动态规划
 * 判段第一个值是否是大于0大于0去加数组的值小于零等于当前数组的值
 */
 var maxSubArray = function(nums) {
  let max = nums[0];
  let num = nums[0];
  for (let i = 1; i < nums.length; i++) {
      if (num > 0) {
          num += nums[i]
      } else {
          num = nums[i];
      }
      max = Math.max(max, num)
  }
  return max;
};
function fibo(n) {
  let nums = 0, a = 0, b =1;
  for (let i = 2; i <= n; i++) {
    nums = a + b;
    a = b;
    b = nums;
  }
  return nums;
}
// function fibo(n) {
//   let arr = [0, 1];
//   for (let i = 2; i <= n; i++) {
//     arr[i] = arr[i - 1] + arr[i -2]
//   }
//   return arr;
// }
// 递归
function fibo(n) {
  if (n <= 1) {
    return 1
  }
  return fibo(n - 1) + fibo(n - 2)
}
// 尾递归
function fibo(n, a = 1, b = 1) {
  if (n <= 1) {
    return 1
  }
  return fibo(n - 1, b, a + b)
}
//普通函数
function fn(a, b, c, d, e) {
  console.log(a, b, c, d, e)
}
//生成的柯里化函数
let _fn = curry(fn)
// 柯里化
function curry(fn) {
  // 闭包
  // 缓存除函数fn之外的所有参数
  let args = Array.prototype.slice.call(arguments, 1)
  return function() {
    // 连接已缓存的老的参数和新传入的参数(即把每次传入的参数全部先保存下来，但是并不执行)
    let newArgs = args.concat(Array.from(arguments))
    console.log(newArgs.length, fn.length, newArgs.length < fn.length)
    if (newArgs.length < fn.length) {
      // 累积的参数总数少于fn形参总数
      // 递归传入fn和已累积的参数
      return curry.call(this, fn, ...newArgs)
    } else {
      // 调用
      return fn.apply(this, newArgs)
    }
  }
}
// _fn(1)(2)(3,4,5)
// compose 函数 接收两个函数从右向左依次执行
// function compose(...arg) {
//   let count = arg.length - 1;
//   let result;
//   return function fn(...arg1) {
//     result = arg[count].apply(this, arg1)
//     if (count > 0) {
//         count--;
//         return fn.call(null, result)
//     } else {
//       count = arg.length - 1;
//       return result;
//     }
//   }
// }
// reduce
const compose = (...fns) => {
  return fns.reduce(
    (prevFn, nextFn) => {
      return value => {
        return prevFn(nextFn(value))
      }
    },
    value => value
  )
}
const greeting = name => `Hello ${name}`
const toUpper = str => str.toUpperCase()
let fn1 = compose(toUpper, greeting)
fn1('a')
