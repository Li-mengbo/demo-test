/**
 * 给定不同面额的硬币 coins 和一个总金额 amount。
 * 编写一个函数来计算可以凑成总金额所需的最少的硬币个数。
 * 如果没有任何一种硬币组合能组成总金额，返回 -1。
 * 如：输入：coins = [1, 2, 5], amount = 11 如果没有任何一种硬币组合能组成总金额，返回 -1。 输出：3 解释：11 = 5 + 5 + 1
 * 如 输入：coins = [3,5], amount = 11
 * 输出：3
 * https://leetcode-cn.com/problems/coin-change/
 * 动态规划
*/
function coinChange(coins, amount) {
  let dp = new Array( amount + 1 ).fill( Infinity );
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
console.log(coinChange([1, 2, 5], 120))
