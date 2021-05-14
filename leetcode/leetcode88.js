/**
 * 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
 * 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。你可以假设 nums1 的空间大小等于 m + n，这样它就有足够的空间
 * 保存来自 nums2 的元素。
 * 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
 * 输出：[1,2,2,3,5,6]
 * 输入：nums1 = [1], m = 1, nums2 = [], n = 0
 * 输出：[1]
 * 双指针解决因为数组都是有序的双指针进行对比从最后一个值进行对比
 * 图片地址
 *  p 为字符串长度-1为字符串最后一个值
 * p1事num1的指针
 *         p1
 * [1, 2, 3, 0, 0, 0]
 * p2 是num2的指针
 *        p2
 * [2, 5, 6]
 * 移动p1和p2对比
 * 解析图片在img文件中
 */
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
 var merge = function(nums1, m, nums2, n) {
  let p = m + n -1;
  let p1 = m - 1;
  let p2 = n - 1;
  while (p2 >= 0) {
      if(p1 < 0) {
          nums1[p--] = nums2[p2--]
      } else if(nums2[p2] > nums1[p1]) {
          nums1[p] = nums2[p2];
          p--;
          p2--;
      } else {
          nums1[p] = nums1[p1];
          p--;
          p1--;
      }
  }
};
