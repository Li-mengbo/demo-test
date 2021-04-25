import { initMinxin } from "./init.js";
function Vue(options) {
  if(!(this instanceof Vue)) {
    console.warn('需要new实例化')
  }
  this._init(options)
}
initMinxin(Vue);