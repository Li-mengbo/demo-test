// 初始化Api在这里进行简化直接调用initMixin在core/instance/index文件中
// 源码引入了Vue调用了一次initGlobalAPI初始化完成后再次抛出Vue
import { initMixin } from "./initMixin.js";
function Vue(options) {
  this._init(options)
}
initMixin(Vue);
// 还有一些方法的初始化暂不处理
export default Vue;