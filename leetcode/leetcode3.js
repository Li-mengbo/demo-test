/**
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * 输入: s = "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * 输入: s = "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 * 输入: s = "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 * 请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 * 滑动窗口 解析看图片image
 */
var lengthOfLongestSubstring = function(s) {
  if (s.length < 1) return "";
  let j = 0, maxLength = 0, setArr = new Set();
  for (let i = 0; i < s.length; i++) {
    if (setArr.has(s[i])) {
      while(setArr.has(s[i])) {
        setArr.delete(s[j]);
        j++;
      }
    }
    setArr.add(s[i]);
    maxLength = Math.max(maxLength, setArr.size)
  }
  return maxLength;
};
var lengthOfLongestSubstring = function(s) {
  if (s.length < 1) return "";
  var x=new Array();
  var len=s.length;
  var max=0;
  var sub="";
  for(let i=0;i<len;i++)
  {
    x[i]=new Array();
  }
  for(let i=0;i<len;i++)
  {
    sub=s[i];
    for(let j=i;j<len;j++){
      if(i==j){
        x[i][j]=1;
      }else {
        if(sub.indexOf(s[j])==-1){
          x[i][j] = x[i][j-1]+1;
        }else {
          break;
        }
      }
      max = Math.max(max, x[i][j]);
      sub+=s[j];
    }
  }
  return max;
};
