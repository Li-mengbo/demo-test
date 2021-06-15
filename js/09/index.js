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
 const get = (from, str, defaultStr) => {
  const string = str
  .replace(/\[([^\[\]]*)\]/g, '.$1.')
  .split('.')
  .filter(t => t !== '')
  .reduce((prev, cur) => prev && prev[cur], from);
  return string || defaultStr
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
/**
 * 1. 解析url中的queryString
 *
 * 输入：https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D
 * 输出：
 * {
 *  name: "coder",
 *  age: "20",
 *  callback: "https://youzan.com?name=test",
 *  list: ["a", "b"],
 *  json: {
 *      str: 'abc',
 *      num: 123
 *  }
 * }
 */
 let url = 'https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&list[]=b&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D'
 function queryString(url) {
   const urlJson = {}
   let locationUrl = url.split('?')[1].split('&')
   locationUrl.forEach(item => {
     let [key, value] = item.split('=')
     if (key.includes('[]')) {
       let keyName = key.split('[]')[0]
       if(resMap[keyName]) {
           resMap[keyName].push(value)
       } else {
           resMap[keyName] = [value]
       }
     } else {
       let deCodeKey = decodeURIComponent(value)
       urlJson[key] = isJson(deCodeKey) ? JSON.parse(deCodeKey) : deCodeKey
     }
   });
   console.log(urlJson)
 }
 queryString(url)
 function isJson(str) {
   if (typeof str === 'string') {
     try {
       JSON.parse(str)
       return true
     }catch(e) {
       return false
     }
   } else {
     return false
   }
 }
/**
 * 3、实现 getValue 函数，安全的获取目标对象指定 path 的值
 * @params {object | array} value 指定对象
 * @params {string} path 路径描述
 * @params {any} defaultValue 默认值
 */
 const get = (from, str, defaultStr) => {
  const string = str
  .replace(/\[([^\[\]]*)\]/g, '.$1.')
  .split('.')
  .filter(t => t !== '')
  .reduce((prev, cur) => prev && prev[cur], from);
  return string || defaultStr
}
/**
 * 常规题：把123456789，变成金钱模式，即：12,345,678（思路有很多，比如reverse之后利用模除手动插入逗号...
 */
// 反转插入正则匹配替换/(\d)(?=(\d{3})+(?!\d))/g
/*
请实现抽奖函数rand，保证随机性
输入为表示对象数组，对象有属性n表示人名，w表示权重
随机返回一个中奖人名，中奖概率和w成正比
*/
let peoples = [
  {n:'p1', w:100},
  {n:'p2', w:200},
  {n:'p3', w:1}
];
let rand = function (p) {
  let length = p.reduce((a,b) => a + b.w, 0)
  for(let i = 0; i < p.length; i++) {
    const random = Math.floor(Math.random() * length);
    console.log(random)
    if (random < p[i].w) {
        return p[i].n
    } else {
      length -= p[i].w
    }
  }
};
rand(peoples)
module.exports = {
  isEqual,
  getValue,
  plus
}


