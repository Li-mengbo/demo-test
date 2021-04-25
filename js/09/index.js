/**
 * 1. 实现一个函数，判断两个变量值是否相等
 *
 * 注意
 * - 数据类型不限于示例，尽可能考虑边界
 * - function 引用相等即可
 */
function isArr(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}
function isObj(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
function isEqual(target1, target2) {
  if (target1 === target2) return true;
  const arr1 = Object.keys(target1)
  const arr2 = Object.keys(target2)
  // 判断对象和数组
  if ((isObj(target1) && isObj(target2) && arr1.length === arr2.length)) {
    for (const key in target1) {
        if (target1.hasOwnProperty(key)) {
            if(!isEqual(target1[key],target2[key]))
              // 对象中具有不相同属性 返回false
              return false;
        }
      }
  } else if((isArr(target1) && isArr(target2) && target1.length === target2.length)) {
    for (let i = 0; i < target1.length; i++) {
      if(!isEqual(target1[i], target2[i])) {
        return false;
      }
    }
  } else if(isNaN(target1) && isNaN(target2)) {
    return true;
  } else {
    return false
  }
  return true;
}
/**
 * 2. 实现 getValue 函数来获取path对应的值
 */
 function getValue(target, valuePath, defaultValue) {
  const arr = valuePath.split('.')
  let i = 0;
  let obj = target;
  while( i < arr.length) {
    if (/(.+)?\[(.+)\]/.test(arr[i])) {
      //console.log(arr[i])
      arr[i].replace(/(.+)?\[(.+)\]/,function(a, b, c){
        //console.log(a,b,c)
        obj = b ? obj[b][c] : obj[c];
        i++;
      })
    } else {
       obj = obj[arr[i]];
       i++;
    }
  }
  return obj || defaultValue;
 }
 /**
 * 问题 3
 * 将一天24小时按每半小划分成48段，我们用一个位图表示选中的时间区间，例如`110000000000000000000000000000000000000000000000`，
 * 表示第一个半小时和第二个半小时被选中了，其余时间段都没有被选中，也就是对应00:00~01:00这个时间区间。一个位图中可能有多个不连续的
 * 时间区间被选中，例如`110010000000000000000000000000000000000000000000`，表示00:00-1:00和02:00-02:30这两个时间区间被选中了。
 *
 * 要求：写一个函数timeBitmapToRanges，将上述规则描述的时间位图转换成一个选中时间区间的数组。
 * 示例输入：`"110010000000000000000000000000000000000000000000"`
 * 示例输出：`["00:00~01:00", "02:00~02:30"]`
 */
function timeBitmapToRanges(str) {}

// console.log(
//   timeBitmapToRanges("110010000000000000000000000000000000000000000000")
// );
// console.log(
//   timeBitmapToRanges("110011000000110000000000000000000000000000001111")
// );
/**
 * 问题四、push方法
 * plus(0).toString() === 0
 * plus(1)(2).toString() === 3
 * plus(1,1)(2,2)(3).toString() === 9
 */
function plus(n) {
  const args = [].slice.call(arguments);
  const answer = function () {
    args.push(...arguments)
    return answer
  }
  answer.toString = function() {
    return args.reduce((a,b) => a+b)
  }
  return answer;
}
module.exports = {
  isEqual,
  getValue,
  plus
}

