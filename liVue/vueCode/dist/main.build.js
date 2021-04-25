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

/***/ "./src/Vue.js":
/*!********************!*\
  !*** ./src/Vue.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init.js */ \"./src/init.js\");\n\r\nfunction Vue(options) {\r\n  if(!(this instanceof Vue)) {\r\n    console.warn('需要new实例化')\r\n  }\r\n  this._init(options)\r\n}\r\n(0,_init_js__WEBPACK_IMPORTED_MODULE_0__.initMinxin)(Vue);\n\n//# sourceURL=webpack://vuecode/./src/Vue.js?");

/***/ }),

/***/ "./src/init.js":
/*!*********************!*\
  !*** ./src/init.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initMinxin\": () => (/* binding */ initMinxin)\n/* harmony export */ });\n/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.js */ \"./src/state.js\");\n\r\nfunction initMinxin(Vue){\r\n  Vue.prototype._init = function(options) {\r\n    const vm = this;\r\n    vm.$options = options;\r\n    vm._self = vm;\r\n    (0,_state_js__WEBPACK_IMPORTED_MODULE_0__.initState)(vm);\r\n  }\r\n};\n\n//# sourceURL=webpack://vuecode/./src/init.js?");

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"initState\": () => (/* binding */ initState),\n/* harmony export */   \"proxy\": () => (/* binding */ proxy)\n/* harmony export */ });\nconst sharedPropertyDefinition = {\r\n  enumerable: true,\r\n  configurable: true,\r\n  get: function() {},\r\n  set: function() {}\r\n}\r\nfunction initState(vm) {\r\n  const opts = vm.$options\r\n  if (opts.data) {\r\n    initData(vm)\r\n  } else {\r\n    // 没有data创建一个空对象并且通过defineProperty监听变化方法是observe\r\n    observe({})\r\n  }\r\n  // 添加watcher监听\r\n}\r\n// 等价于demo07里的proxy方法\r\nfunction proxy (target, sourceKey, key) {\r\n  sharedPropertyDefinition.get = function() {\r\n    return target[sourceKey][key]\r\n  }\r\n  sharedPropertyDefinition.set = function(val) {\r\n    target[sourceKey][key] = val;\r\n  }\r\n  Object.defineProperty(target, key, sharedPropertyDefinition)\r\n}\r\nfunction initData(vm) {\r\n  let data = vm.$options.data;\r\n  // 判断是不是对象的形式暂不处理只考虑是对象\r\n  // data = vm._data = typeOf data === 'function'\r\n  data = data || {};\r\n  const keys = Object.keys(data);\r\n  const i = keys.length;\r\n  while(i--) {\r\n    const key = keys[i];\r\n    // 真实Vue处理了data中的key值与props和methods是否相等，相等的话给出警告,暂不考虑\r\n    // 把data的值分别绑定到vue实例上并且通过_data可以访问也可以通过vue.XX访问\r\n    proxy(vm, `_data`, key)\r\n  }\r\n  observe(data);\r\n}\n\n//# sourceURL=webpack://vuecode/./src/state.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Vue.js");
/******/ 	
/******/ })()
;