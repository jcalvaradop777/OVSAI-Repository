"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/volcan/page",{

/***/ "(app-pages-browser)/./src/app/components/Map/MenuCtx.js":
/*!*******************************************!*\
  !*** ./src/app/components/Map/MenuCtx.js ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ MenuContext; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Modals_VentanaGuralp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Modals/VentanaGuralp */ \"(app-pages-browser)/./src/app/components/Modals/VentanaGuralp.js\");\n\nvar _s = $RefreshSig$();\n\n\nfunction MenuContext(param) {\n    let { Mposition, setMPosition } = param;\n    _s();\n    const [mostrarVentana, setVentana] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const abrirTrazas = ()=>{\n        setVentana(true);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                style: {\n                    left: \"\".concat(Mposition.x, \"px\"),\n                    top: \"\".concat(Mposition.y, \"px\")\n                },\n                className: \"absolute bg-white p-1 box-content border border-slate-700 shadow-lg list-none w-max rounded-xl z-50\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                        className: \"cursor-pointer select-none p-2 rounded-md\",\n                        children: \"Editar\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Volcan-Project\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\Map\\\\MenuCtx.js\",\n                        lineNumber: 17,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                        className: \"cursor-pointer select-none p-2 rounded-md\",\n                        children: \"Eliminar\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Volcan-Project\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\Map\\\\MenuCtx.js\",\n                        lineNumber: 18,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                        className: \"cursor-pointer select-none p-2 rounded-md\",\n                        onClick: abrirTrazas,\n                        children: \"Trazas\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Volcan-Project\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\Map\\\\MenuCtx.js\",\n                        lineNumber: 19,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                        className: \"cursor-pointer select-none p-2 rounded-md\",\n                        children: \"Habilitar/Deshabilitar\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Volcan-Project\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\Map\\\\MenuCtx.js\",\n                        lineNumber: 20,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                        className: \"cursor-pointer select-none p-2 rounded-md\",\n                        children: \"Agregar estaci\\xf3n\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Volcan-Project\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\Map\\\\MenuCtx.js\",\n                        lineNumber: 23,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                        className: \"cursor-pointer select-none p-2 rounded-md\",\n                        children: \"Agregar sensor\"\n                    }, void 0, false, {\n                        fileName: \"D:\\\\Volcan-Project\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\Map\\\\MenuCtx.js\",\n                        lineNumber: 26,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\Volcan-Project\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\Map\\\\MenuCtx.js\",\n                lineNumber: 13,\n                columnNumber: 7\n            }, this),\n            mostrarVentana ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Modals_VentanaGuralp__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"D:\\\\Volcan-Project\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\Map\\\\MenuCtx.js\",\n                lineNumber: 30,\n                columnNumber: 25\n            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}, void 0, false)\n        ]\n    }, void 0, true);\n}\n_s(MenuContext, \"SXQoHGECLJcbbnmR3+X5GaFWwJU=\");\n_c = MenuContext;\nvar _c;\n$RefreshReg$(_c, \"MenuContext\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY29tcG9uZW50cy9NYXAvTWVudUN0eC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWlDO0FBQ21CO0FBRXJDLFNBQVNFLFlBQVksS0FBMkI7UUFBM0IsRUFBRUMsU0FBUyxFQUFFQyxZQUFZLEVBQUUsR0FBM0I7O0lBQ2xDLE1BQU0sQ0FBQ0MsZ0JBQWdCQyxXQUFXLEdBQUdOLCtDQUFRQSxDQUFDO0lBRTlDLE1BQU1PLGNBQWM7UUFDbEJELFdBQVc7SUFDYjtJQUVBLHFCQUNFOzswQkFDRSw4REFBQ0U7Z0JBQ0NDLE9BQU87b0JBQUVDLE1BQU0sR0FBZSxPQUFaUCxVQUFVUSxDQUFDLEVBQUM7b0JBQUtDLEtBQUssR0FBZSxPQUFaVCxVQUFVVSxDQUFDLEVBQUM7Z0JBQUk7Z0JBQzNEQyxXQUFZOztrQ0FFWiw4REFBQ0M7d0JBQUdELFdBQVU7a0NBQTRDOzs7Ozs7a0NBQzFELDhEQUFDQzt3QkFBR0QsV0FBVTtrQ0FBNEM7Ozs7OztrQ0FDMUQsOERBQUNDO3dCQUFHRCxXQUFVO3dCQUE0Q0UsU0FBU1Q7a0NBQWE7Ozs7OztrQ0FDaEYsOERBQUNRO3dCQUFHRCxXQUFVO2tDQUE0Qzs7Ozs7O2tDQUcxRCw4REFBQ0M7d0JBQUdELFdBQVU7a0NBQTRDOzs7Ozs7a0NBRzFELDhEQUFDQzt3QkFBR0QsV0FBVTtrQ0FBNEM7Ozs7Ozs7Ozs7OztZQUkzRFQsK0JBQWlCLDhEQUFDSiw2REFBYUE7Ozs7cUNBQU07OztBQUc1QztHQTdCd0JDO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvY29tcG9uZW50cy9NYXAvTWVudUN0eC5qcz8wZmFmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWZW50YW5hR3VyYWxwIGZyb20gXCIuLi9Nb2RhbHMvVmVudGFuYUd1cmFscFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWVudUNvbnRleHQoeyBNcG9zaXRpb24sIHNldE1Qb3NpdGlvbiB9KSB7XHJcbiAgY29uc3QgW21vc3RyYXJWZW50YW5hLCBzZXRWZW50YW5hXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgYWJyaXJUcmF6YXMgPSAoKSA9PiB7XHJcbiAgICBzZXRWZW50YW5hKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDx1bFxyXG4gICAgICAgIHN0eWxlPXt7IGxlZnQ6IGAke01wb3NpdGlvbi54fXB4YCwgdG9wOiBgJHtNcG9zaXRpb24ueX1weGAgfX1cclxuICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSBiZy13aGl0ZSBwLTEgYm94LWNvbnRlbnQgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgc2hhZG93LWxnIGxpc3Qtbm9uZSB3LW1heCByb3VuZGVkLXhsIHotNTBgfVxyXG4gICAgICA+XHJcbiAgICAgICAgPGxpIGNsYXNzTmFtZT1cImN1cnNvci1wb2ludGVyIHNlbGVjdC1ub25lIHAtMiByb3VuZGVkLW1kXCI+RWRpdGFyPC9saT5cclxuICAgICAgICA8bGkgY2xhc3NOYW1lPVwiY3Vyc29yLXBvaW50ZXIgc2VsZWN0LW5vbmUgcC0yIHJvdW5kZWQtbWRcIj5FbGltaW5hcjwvbGk+XHJcbiAgICAgICAgPGxpIGNsYXNzTmFtZT1cImN1cnNvci1wb2ludGVyIHNlbGVjdC1ub25lIHAtMiByb3VuZGVkLW1kXCIgb25DbGljaz17YWJyaXJUcmF6YXN9PlRyYXphczwvbGk+XHJcbiAgICAgICAgPGxpIGNsYXNzTmFtZT1cImN1cnNvci1wb2ludGVyIHNlbGVjdC1ub25lIHAtMiByb3VuZGVkLW1kXCI+XHJcbiAgICAgICAgICBIYWJpbGl0YXIvRGVzaGFiaWxpdGFyXHJcbiAgICAgICAgPC9saT5cclxuICAgICAgICA8bGkgY2xhc3NOYW1lPVwiY3Vyc29yLXBvaW50ZXIgc2VsZWN0LW5vbmUgcC0yIHJvdW5kZWQtbWRcIj5cclxuICAgICAgICAgIEFncmVnYXIgZXN0YWNpw7NuXHJcbiAgICAgICAgPC9saT5cclxuICAgICAgICA8bGkgY2xhc3NOYW1lPVwiY3Vyc29yLXBvaW50ZXIgc2VsZWN0LW5vbmUgcC0yIHJvdW5kZWQtbWRcIj5cclxuICAgICAgICAgIEFncmVnYXIgc2Vuc29yXHJcbiAgICAgICAgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgICAge21vc3RyYXJWZW50YW5hID8gPFZlbnRhbmFHdXJhbHAgLz4gOiA8PjwvPn1cclxuICAgIDwvPlxyXG4gICk7XHJcbn1cclxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwiVmVudGFuYUd1cmFscCIsIk1lbnVDb250ZXh0IiwiTXBvc2l0aW9uIiwic2V0TVBvc2l0aW9uIiwibW9zdHJhclZlbnRhbmEiLCJzZXRWZW50YW5hIiwiYWJyaXJUcmF6YXMiLCJ1bCIsInN0eWxlIiwibGVmdCIsIngiLCJ0b3AiLCJ5IiwiY2xhc3NOYW1lIiwibGkiLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/components/Map/MenuCtx.js\n"));

/***/ })

});