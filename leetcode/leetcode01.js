/**
 * 两数之和
 * 输入：nums = [2,7,11,15], target = 9
 * 输出：[0,1]
 * 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
 * 链接：https://leetcode-cn.com/problems/two-sum
 */
 var twoSum = function(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const difference = target - nums[i];
    if(map.has(difference)) {
      return [ map.get(difference), i];
    }
    map.set(nums[i], i);
  }
  return [];
};