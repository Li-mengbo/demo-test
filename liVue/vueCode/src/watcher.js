import { pushTarget, popTarget } from './dep'
let uid = 0;
export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm
    this.id = uid++
    this.deps = []
    this.getter = expOrFn;
    this.cb = cb
    this.value = this.get()
  }
  get() {
    pushTarget(this)
    const vm = this.vm
    let value = this.getter.call(vm, vm)
    popTarget()
    this.cleanupDeps()
    return value
  }
  run() {
    const value = this.get()
    const oldValue = this.value
    this.value = value
    this.cb.call(this.vm, value, oldValue)
  }
  addDep(dep) {
    dep.addSub(this)
  }
  update() {
    this.run()
  }
  cleanupDeps() {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      // if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      // }
    }
  }
  depend() {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }
}
