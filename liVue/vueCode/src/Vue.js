// 初始化Api在这里进行简化直接调用initMixin在core/instance/index文件中
// 源码调用了initGlobalAPI
import { initMixin } from "./initMixin.js";
function Vue(options) {
  this._init(options)
}
initMixin(Vue);
export default Vue;