(() => { // webpackBootstrap
  "use strict";
  var __webpack_modules__ = ({
   "./index.js":((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
     eval(`
     __webpack_require__.r(__webpack_exports__);
     \n/* harmony import */
     var _src_two_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/two.js */ \"./src/two.js\");
     \n/* harmony import */
     var _src_one_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/one.js */ \"./src/one.js\");
     const sum = (0,_src_one_js__WEBPACK_IMPORTED_MODULE_1__.add)(_src_two_js__WEBPACK_IMPORTED_MODULE_0__.a,_src_two_js__WEBPACK_IMPORTED_MODULE_0__.b)
     console.log(sum)`);
   }),

   "./src/one.js":((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
     eval(`
       __webpack_require__.r(__webpack_exports__);
       \n/* harmony export */
       __webpack_require__.d(__webpack_exports__, { "add": () => add });
       function add(a, b) {return a + b}
     `);
   }),

   "./src/two.js":((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
     eval(`
     __webpack_require__.r(__webpack_exports__);
     \n/* harmony export */
     __webpack_require__.d(__webpack_exports__, {"a": () => a,"b": () =>b });
     const a = 1;
     const b = 2;
     `);
   })
 });
/************************************************************************/
  // webpack缓存对象
  var __webpack_module_cache__ = {};

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // Create a new module (and put it into the cache)
    var module = __webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {}
    };

    // Execute the module function
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    // Return the exports of the module
    return module.exports;
  }

/************************************************************************/
  /* webpack/runtime/define property getters */
  (() => {
    // define getter functions for harmony exports
    __webpack_require__.d = (exports, definition) => {
      for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
      }
    };
  })();

  /* webpack/runtime/hasOwnProperty shorthand */
  (() => {
    __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
  })();

  /* webpack/runtime/make namespace object */
  (() => {
    // define __esModule on exports
    __webpack_require__.r = (exports) => {
      if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(exports, '__esModule', { value: true });
    };
  })();
  var __webpack_exports__ = __webpack_require__("./index.js");
})()
