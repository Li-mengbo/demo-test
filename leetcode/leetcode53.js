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
