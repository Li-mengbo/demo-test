/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/vue */ \"./src/vue.js\");\n\r\nconsole.log(new _src_vue__WEBPACK_IMPORTED_MODULE_0__.default({\r\n  data: {\r\n    name: 1\r\n  }\r\n}))\r\nconsole.log(111)\n\n//# sourceURL=webpack://vuecode/./index.js?");

/***/ }),

/***/ "./src/initMixin.js":
/*!**************************!*\
  !*** ./src/initMixin.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initMixin\": () => (/* binding */ initMixin)\n/* harmony export */ });\n/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.js */ \"./src/state.js\");\n\r\nfunction initMixin(Vue){\r\n  Vue.prototype._init = function(options) {\r\n    const vm = this;\r\n    vm.$options = options;\r\n    vm._self = vm;\r\n    (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.initState)(vm);\r\n  }\r\n};\n\n//# sourceURL=webpack://vuecode/./src/initMixin.js?");

/***/ }),

/***/ "./src/observe.js":
/*!************************!*\
  !*** ./src/observe.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Observe\": () => (/* binding */ Observe),\n/* harmony export */   \"observe\": () => (/* binding */ observe),\n/* harmony export */   \"defineReactive\": () => (/* binding */ defineReactive)\n/* harmony export */ });\nclass Observe {\r\n  constructor(value) {\r\n    // 执行了Dep暂不处理\r\n  }\r\n\r\n}\r\nfunction observe(value) {\r\n\r\n}\r\nfunction defineReactive(obj, key, value) {\r\n  // 数据劫持\r\n  Object.defineProperty(obj, key, {\r\n    enumerable: true,\r\n    configurable: true,\r\n    get: function() {\r\n      return value;\r\n    },\r\n    set: function(val) {\r\n      value = val;\r\n      // 触发视图更新\r\n    }\r\n  })\r\n}\n\n//# sourceURL=webpack://vuecode/./src/observe.js?");

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initState\": () => (/* binding */ initState),\n/* harmony export */   \"proxy\": () => (/* binding */ proxy)\n/* harmony export */ });\n/* harmony import */ var _observe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observe */ \"./src/observe.js\");\n\r\nconst sharedPropertyDefinition = {\r\n  enumerable: true,\r\n  configurable: true,\r\n  get: function() {},\r\n  set: function() {}\r\n}\r\nfunction initState(vm) {\r\n  const opts = vm.$options\r\n  if (opts.data) {\r\n    initData(vm)\r\n  } else {\r\n    // 没有data创建一个空对象并且通过defineProperty监听变化方法是observe\r\n    (0,_observe__WEBPACK_IMPORTED_MODULE_0__.observe)({})\r\n  }\r\n  /**以下方法都咱不实现 */\r\n  // 如果有组件属性props则初始化组件属性（接收父组件的传过来的参数哦）\r\n  if (opts.props) {\r\n    // 暂不实现\r\n  }\r\n  // 如果有方法属性mothods则初始化方法属性\r\n  if (opts.methods) {\r\n    // 暂不实现\r\n  }\r\n  // 如果有计算属性computed则初始化计算属性\r\n  if (opts.computed) {\r\n    // 暂不实现\r\n  }\r\n  // 如果有watch添加watch监听\r\n  if (opts.watch) {\r\n    // 暂不实现\r\n  }\r\n}\r\n// 等价于demo07里的proxy方法\r\nfunction proxy (target, sourceKey, key) {\r\n  sharedPropertyDefinition.get = function() {\r\n    console.log()\r\n    return this[sourceKey][key]\r\n  }\r\n  sharedPropertyDefinition.set = function(val) {\r\n    this[sourceKey][key] = val;\r\n  }\r\n  Object.defineProperty(target, key, sharedPropertyDefinition)\r\n}\r\nfunction initData(vm) {\r\n  let data = vm.$options.data;\r\n  // 判断是不是对象的形式暂不处理只考虑是对象\r\n  // data = vm._data = typeOf data === 'function'\r\n  data = vm._data =  data || {};\r\n  const keys = Object.keys(data);\r\n  let i = keys.length;\r\n  while(i--) {\r\n    const key = keys[i];\r\n    // 真实Vue处理了data中的key值与props和methods是否相等，相等的话给出警告,暂不考虑\r\n    // 把data的值分别绑定到vue实例上并且通过_data可以访问也可以通过vue.XX访问\r\n    proxy(vm, `_data`, key)\r\n  }\r\n  // 第二个值是bool值暂不实现说明一下可以用来\r\n  (0,_observe__WEBPACK_IMPORTED_MODULE_0__.observe)(data);\r\n}\n\n//# sourceURL=webpack://vuecode/./src/state.js?");

/***/ }),

/***/ "./src/vue.js":
/*!********************!*\
  !*** ./src/vue.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _initMixin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initMixin.js */ \"./src/initMixin.js\");\n// 初始化Api在这里进行简化直接调用initMixin在core/instance/index文件中\r\n// 源码调用了initGlobalAPI\r\n\r\nfunction Vue(options) {\r\n  this._init(options)\r\n}\r\n(0,_initMixin_js__WEBPACK_IMPORTED_MODULE_0__.initMixin)(Vue);\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Vue);\n\n//# sourceURL=webpack://vuecode/./src/vue.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;