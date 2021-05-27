let uid = 0
export default class Dep() {
  constructor() {
    this.id = uid++
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  removeSub (sub) {
    if (this.subs.length) {
      const index = this.subs.indexOf(sub)
      if (index > -1) {
        this.subs.splice(index, 1)
      }
    }
  }
  depend() {
    if(Dep.target) {
      Dep.target.addDep(this)
    }
  }
  notify () {
    // 派发事件
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
const targetStack = [];
export function pushTarget (target) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
function sort(arr) {
  if (arr.length <= 1) return arr
  const left = [];
  const right = [];
  const num = arr[0];
  for(var i = 1; i < arr.length; i++){
    if(arr[i]<=num){
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...sort(left), num, ...sort(right)]
}
