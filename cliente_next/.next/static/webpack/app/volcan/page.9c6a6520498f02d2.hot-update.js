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

/***/ "(app-pages-browser)/./src/app/guralp/page.js":
/*!********************************!*\
  !*** ./src/app/guralp/page.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Pagina; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_Traza__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Traza */ \"(app-pages-browser)/./src/app/components/Traza.jsx\");\n/* harmony import */ var _components_BoxPlot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/BoxPlot */ \"(app-pages-browser)/./src/app/components/BoxPlot.jsx\");\n/* harmony import */ var _components_SidebarTrazas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/SidebarTrazas */ \"(app-pages-browser)/./src/app/components/SidebarTrazas.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n// captura los datos CFG provenientes del servidor Django y los envía a los compontentes para ser\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction Pagina() {\n    _s();\n    const [trazasRecibidas, setTrzasRecibidas] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null);\n    const handleRecibirDatos = (datos)=>{\n        setTrzasRecibidas(datos);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{\n        fetchData();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_SidebarTrazas__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                onEnviarDatos: handleRecibirDatos\n            }, void 0, false, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\guralp\\\\page.js\",\n                lineNumber: 25,\n                columnNumber: 7\n            }, this),\n            \" \",\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex-1\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"p-1\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Traza__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                            dx: trazasRecibidas.idx,\n                            dy: trazasRecibidas.valores,\n                            dtitulo: \"Traza individual: \" + trazasRecibidas.titulo\n                        }, void 0, false, {\n                            fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\guralp\\\\page.js\",\n                            lineNumber: 28,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Traza__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                            dx: trazasRecibidas.tiempo,\n                            dy: trazasRecibidas.estacionalidad,\n                            dtitulo: \"Componente estacional: \" + trazasRecibidas.titulo\n                        }, void 0, false, {\n                            fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\guralp\\\\page.js\",\n                            lineNumber: 29,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Traza__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                            dx: trazasRecibidas.tiempo,\n                            dy: trazasRecibidas.ruido,\n                            dtitulo: \"Componente residual: \" + trazasRecibidas.titulo\n                        }, void 0, false, {\n                            fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\guralp\\\\page.js\",\n                            lineNumber: 30,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Traza__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                            dx: trazasRecibidas.tiempo,\n                            dy: trazasRecibidas.tendencia,\n                            dtitulo: \"Tendencia: \" + trazasRecibidas.titulo\n                        }, void 0, false, {\n                            fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\guralp\\\\page.js\",\n                            lineNumber: 31,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_BoxPlot__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                            dy: trazasRecibidas.valores,\n                            dtitulo: \"Box-plot: \" + trazasRecibidas.titulo\n                        }, void 0, false, {\n                            fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\guralp\\\\page.js\",\n                            lineNumber: 32,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\guralp\\\\page.js\",\n                    lineNumber: 27,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\guralp\\\\page.js\",\n                lineNumber: 26,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\guralp\\\\page.js\",\n        lineNumber: 24,\n        columnNumber: 5\n    }, this);\n}\n_s(Pagina, \"dkUFsDC0GuTe1Sa4THZegzvSdUA=\");\n_c = Pagina;\nvar _c;\n$RefreshReg$(_c, \"Pagina\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZ3VyYWxwL3BhZ2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlHQUFpRzs7O0FBSXpEO0FBQ0k7QUFDWTtBQUNaO0FBRTdCLFNBQVNLOztJQUV0QixNQUFNLENBQUNDLGlCQUFpQkMsa0JBQWtCLEdBQUdILCtDQUFRQSxDQUFDO0lBRXRELE1BQU1JLHFCQUFxQixDQUFDQztRQUMxQkYsa0JBQWtCRTtJQUNwQjtJQUVBTixnREFBU0EsQ0FBQztRQUNSTztJQUNGLEdBQUcsRUFBRTtJQUdMLHFCQUNFLDhEQUFDQztRQUFJQyxXQUFVOzswQkFDYiw4REFBQ1YsaUVBQWFBO2dCQUFDVyxlQUFlTDs7Ozs7O1lBQXFCOzBCQUNuRCw4REFBQ0c7Z0JBQUlDLFdBQVU7MEJBQ2IsNEVBQUNEO29CQUFJQyxXQUFVOztzQ0FDYiw4REFBQ1oseURBQUtBOzRCQUFDYyxJQUFJUixnQkFBZ0JTLEdBQUc7NEJBQUVDLElBQUlWLGdCQUFnQlcsT0FBTzs0QkFBRUMsU0FBUyx1QkFBdUJaLGdCQUFnQmEsTUFBTTs7Ozs7O3NDQUNuSCw4REFBQ25CLHlEQUFLQTs0QkFBQ2MsSUFBSVIsZ0JBQWdCYyxNQUFNOzRCQUFFSixJQUFJVixnQkFBZ0JlLGNBQWM7NEJBQUVILFNBQVMsNEJBQTRCWixnQkFBZ0JhLE1BQU07Ozs7OztzQ0FDbEksOERBQUNuQix5REFBS0E7NEJBQUNjLElBQUlSLGdCQUFnQmMsTUFBTTs0QkFBRUosSUFBSVYsZ0JBQWdCZ0IsS0FBSzs0QkFBRUosU0FBUywwQkFBMEJaLGdCQUFnQmEsTUFBTTs7Ozs7O3NDQUN2SCw4REFBQ25CLHlEQUFLQTs0QkFBQ2MsSUFBSVIsZ0JBQWdCYyxNQUFNOzRCQUFFSixJQUFJVixnQkFBZ0JpQixTQUFTOzRCQUFFTCxTQUFTLGdCQUFnQlosZ0JBQWdCYSxNQUFNOzs7Ozs7c0NBQ2pILDhEQUFDbEIsMkRBQU9BOzRCQUFDZSxJQUFJVixnQkFBZ0JXLE9BQU87NEJBQUVDLFNBQVMsZUFBZVosZ0JBQWdCYSxNQUFNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUs5RjtHQTNCd0JkO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvZ3VyYWxwL3BhZ2UuanM/YmQ5MiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjYXB0dXJhIGxvcyBkYXRvcyBDRkcgcHJvdmVuaWVudGVzIGRlbCBzZXJ2aWRvciBEamFuZ28geSBsb3MgZW52w61hIGEgbG9zIGNvbXBvbnRlbnRlcyBwYXJhIHNlclxyXG5cclxuXCJ1c2UgY2xpZW50XCI7XHJcblxyXG5pbXBvcnQgVHJhemEgZnJvbSAnLi4vY29tcG9uZW50cy9UcmF6YSc7XHJcbmltcG9ydCBCb3hQbG90IGZyb20gJy4uL2NvbXBvbmVudHMvQm94UGxvdCc7XHJcbmltcG9ydCBTaWRlYmFyVHJhemFzIGZyb20gJy4uL2NvbXBvbmVudHMvU2lkZWJhclRyYXphcyc7XHJcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2luYSgpIHtcclxuXHJcbiAgY29uc3QgW3RyYXphc1JlY2liaWRhcywgc2V0VHJ6YXNSZWNpYmlkYXNdID0gdXNlU3RhdGUobnVsbCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVJlY2liaXJEYXRvcyA9IChkYXRvcykgPT4geyAvLyBlc3RhIGZ1bmNpw7NuIGVzIHBhc2FkYSBjb21vIHBhcmFtZXRybyAob25FbnZpYXJEYXRvcykgYWwgY29tcG9uZW50ZSBTaWRlYmFyVHJhemFzXHJcbiAgICBzZXRUcnphc1JlY2liaWRhcyhkYXRvcyk7XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGZldGNoRGF0YSgpO1xyXG4gIH0sIFtdKTtcclxuXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXhcIj5cclxuICAgICAgPFNpZGViYXJUcmF6YXMgb25FbnZpYXJEYXRvcz17aGFuZGxlUmVjaWJpckRhdG9zfS8+IHsvKmVzdG8gZXMgZWwgbGFkbyBpenF1aWVyZG8gcXVlIG9idGllbmUgbG9zIHN1YmZvbGRlcnMgeSBsb3MgcmVzcGVjdGl2b3Mgbm9tYnJlcyBkZSBhcmNoaXZvcyAqL31cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTFcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMVwiPlxyXG4gICAgICAgICAgPFRyYXphIGR4PXt0cmF6YXNSZWNpYmlkYXMuaWR4fSBkeT17dHJhemFzUmVjaWJpZGFzLnZhbG9yZXN9IGR0aXR1bG89e1wiVHJhemEgaW5kaXZpZHVhbDogXCIgKyB0cmF6YXNSZWNpYmlkYXMudGl0dWxvfSAvPlxyXG4gICAgICAgICAgPFRyYXphIGR4PXt0cmF6YXNSZWNpYmlkYXMudGllbXBvfSBkeT17dHJhemFzUmVjaWJpZGFzLmVzdGFjaW9uYWxpZGFkfSBkdGl0dWxvPXtcIkNvbXBvbmVudGUgZXN0YWNpb25hbDogXCIgKyB0cmF6YXNSZWNpYmlkYXMudGl0dWxvfSAvPlxyXG4gICAgICAgICAgPFRyYXphIGR4PXt0cmF6YXNSZWNpYmlkYXMudGllbXBvfSBkeT17dHJhemFzUmVjaWJpZGFzLnJ1aWRvfSBkdGl0dWxvPXtcIkNvbXBvbmVudGUgcmVzaWR1YWw6IFwiICsgdHJhemFzUmVjaWJpZGFzLnRpdHVsb30gLz5cclxuICAgICAgICAgIDxUcmF6YSBkeD17dHJhemFzUmVjaWJpZGFzLnRpZW1wb30gZHk9e3RyYXphc1JlY2liaWRhcy50ZW5kZW5jaWF9IGR0aXR1bG89e1wiVGVuZGVuY2lhOiBcIiArIHRyYXphc1JlY2liaWRhcy50aXR1bG99IC8+XHJcbiAgICAgICAgICA8Qm94UGxvdCBkeT17dHJhemFzUmVjaWJpZGFzLnZhbG9yZXN9IGR0aXR1bG89e1wiQm94LXBsb3Q6IFwiICsgdHJhemFzUmVjaWJpZGFzLnRpdHVsb30gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJUcmF6YSIsIkJveFBsb3QiLCJTaWRlYmFyVHJhemFzIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJQYWdpbmEiLCJ0cmF6YXNSZWNpYmlkYXMiLCJzZXRUcnphc1JlY2liaWRhcyIsImhhbmRsZVJlY2liaXJEYXRvcyIsImRhdG9zIiwiZmV0Y2hEYXRhIiwiZGl2IiwiY2xhc3NOYW1lIiwib25FbnZpYXJEYXRvcyIsImR4IiwiaWR4IiwiZHkiLCJ2YWxvcmVzIiwiZHRpdHVsbyIsInRpdHVsbyIsInRpZW1wbyIsImVzdGFjaW9uYWxpZGFkIiwicnVpZG8iLCJ0ZW5kZW5jaWEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/guralp/page.js\n"));

/***/ })

});