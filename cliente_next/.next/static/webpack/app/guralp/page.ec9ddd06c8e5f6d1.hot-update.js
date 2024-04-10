"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/guralp/page",{

/***/ "(app-pages-browser)/./src/app/components/SidebarTrazas.js":
/*!*********************************************!*\
  !*** ./src/app/components/SidebarTrazas.js ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n// Sidebar.js\n\nvar _s = $RefreshSig$();\n\nconst SidebarTrazas = ()=>{\n    _s();\n    const [selectedDate, setSelectedDate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"); // variable selectedDate que contiene el mes seleccionado del caldenario de trazas\n    const handleDateChange = (event)=>{\n        setSelectedDate(event.target.value);\n    };\n    const handleSubmit = async ()=>{\n        try {\n            const response = await fetch(\"http://127.0.0.1:8000/api/procesar_fecha/\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    selectedDate\n                })\n            });\n            if (!response.ok) {\n                throw new Error(\"Error al procesar la solicitud\");\n            }\n            const data = await response.json();\n            console.log(data);\n        } catch (error) {\n            console.error(\"Error al enviar la fecha:\", error);\n        }\n    };\n    const [subfolders, setSubfolders] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const fetchSubfolders = async ()=>{\n        const response = await fetch(\"http://127.0.0.1:8000/api/procesar_fecha/\"); // recibe a la URL los datos de las trazas y sus descomposition\n        const jsonData = await response.json();\n        console.log(\"HolaAAAAAAAA, \".concat(jsonData));\n        setSubfolders(jsonData);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        fetchSubfolders();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"relative flex flex-col bg-clip-border bg-white text-gray-700 h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-50\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                className: \"text-xl font-bold mb-4\",\n                children: \"Trazas\"\n            }, void 0, false, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                lineNumber: 50,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                type: \"month\",\n                id: \"fecha\",\n                name: \"fecha\",\n                onChange: handleDateChange\n            }, void 0, false, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                lineNumber: 51,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: [\n                    \"Fecha seleccionada: \",\n                    selectedDate\n                ]\n            }, void 0, true, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                lineNumber: 52,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                class: \"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded\",\n                onClick: handleSubmit,\n                children: \"Enviar Fecha\"\n            }, void 0, false, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                lineNumber: 53,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                className: \"flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                    className: \"w-full p-2 bg-white border border-gray-300 rounded\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                            value: \"opcion1\",\n                            children: \"Opci\\xf3n 1\"\n                        }, void 0, false, {\n                            fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                            lineNumber: 56,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                            value: \"opcion2\",\n                            children: \"Opci\\xf3n 2\"\n                        }, void 0, false, {\n                            fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                            lineNumber: 57,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                            value: \"opcion3\",\n                            children: \"Opci\\xf3n 3\"\n                        }, void 0, false, {\n                            fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                            lineNumber: 58,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                    lineNumber: 55,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                lineNumber: 54,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n        lineNumber: 49,\n        columnNumber: 5\n    }, undefined);\n};\n_s(SidebarTrazas, \"2QMOB3aLMIjex6FQfbxrandbxgg=\");\n_c = SidebarTrazas;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SidebarTrazas);\nvar _c;\n$RefreshReg$(_c, \"SidebarTrazas\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY29tcG9uZW50cy9TaWRlYmFyVHJhemFzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxhQUFhOzs7QUFDK0I7QUFFNUMsTUFBTUUsZ0JBQWdCOztJQUVwQixNQUFNLENBQUNDLGNBQWNDLGdCQUFnQixHQUFHSCwrQ0FBUUEsQ0FBQyxLQUFLLGtGQUFrRjtJQUV4SSxNQUFNSSxtQkFBbUIsQ0FBQ0M7UUFDeEJGLGdCQUFnQkUsTUFBTUMsTUFBTSxDQUFDQyxLQUFLO0lBQ3BDO0lBR0EsTUFBTUMsZUFBZTtRQUNuQixJQUFJO1lBQ0YsTUFBTUMsV0FBVyxNQUFNQyxNQUFNLDZDQUE0QztnQkFDdkVDLFFBQVE7Z0JBQ1JDLFNBQVM7b0JBQ1AsZ0JBQWdCO2dCQUNsQjtnQkFDQUMsTUFBTUMsS0FBS0MsU0FBUyxDQUFDO29CQUFFYjtnQkFBYTtZQUN0QztZQUVBLElBQUksQ0FBQ08sU0FBU08sRUFBRSxFQUFFO2dCQUNoQixNQUFNLElBQUlDLE1BQU07WUFDbEI7WUFFQSxNQUFNQyxPQUFPLE1BQU1ULFNBQVNVLElBQUk7WUFDaENDLFFBQVFDLEdBQUcsQ0FBQ0g7UUFDZCxFQUFFLE9BQU9JLE9BQU87WUFDZEYsUUFBUUUsS0FBSyxDQUFDLDZCQUE2QkE7UUFDN0M7SUFDRjtJQUVBLE1BQU0sQ0FBQ0MsWUFBWUMsY0FBYyxHQUFHeEIsK0NBQVFBLENBQUM7SUFFN0MsTUFBTXlCLGtCQUFrQjtRQUN0QixNQUFNaEIsV0FBVyxNQUFNQyxNQUFNLDhDQUE4QywrREFBK0Q7UUFDMUksTUFBTWdCLFdBQVcsTUFBTWpCLFNBQVNVLElBQUk7UUFFcENDLFFBQVFDLEdBQUcsQ0FBQyxpQkFBMEIsT0FBVEs7UUFDN0JGLGNBQWNFO0lBQ2hCO0lBRUEzQixnREFBU0EsQ0FBQztRQUNSMEI7SUFDRixHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQ0U7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNDO2dCQUFHRCxXQUFVOzBCQUF5Qjs7Ozs7OzBCQUN2Qyw4REFBQ0U7Z0JBQU1DLE1BQUs7Z0JBQVNDLElBQUc7Z0JBQVFDLE1BQUs7Z0JBQVFDLFVBQVU5Qjs7Ozs7OzBCQUN2RCw4REFBQytCOztvQkFBRTtvQkFBcUJqQzs7Ozs7OzswQkFDeEIsOERBQUNrQztnQkFBT0MsT0FBTTtnQkFBeUVDLFNBQVM5QjswQkFBYzs7Ozs7OzBCQUM5Ryw4REFBQytCO2dCQUFJWCxXQUFVOzBCQUNiLDRFQUFDWTtvQkFBT1osV0FBVTs7c0NBQ2hCLDhEQUFDYTs0QkFBT2xDLE9BQU07c0NBQVU7Ozs7OztzQ0FDeEIsOERBQUNrQzs0QkFBT2xDLE9BQU07c0NBQVU7Ozs7OztzQ0FDeEIsOERBQUNrQzs0QkFBT2xDLE9BQU07c0NBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS2xDO0dBM0RNTjtLQUFBQTtBQTZETiwrREFBZUEsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2NvbXBvbmVudHMvU2lkZWJhclRyYXphcy5qcz8zMmE1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIFNpZGViYXIuanNcclxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuY29uc3QgU2lkZWJhclRyYXphcyA9ICgpID0+IHtcclxuXHJcbiAgY29uc3QgW3NlbGVjdGVkRGF0ZSwgc2V0U2VsZWN0ZWREYXRlXSA9IHVzZVN0YXRlKCcnKTsgLy8gdmFyaWFibGUgc2VsZWN0ZWREYXRlIHF1ZSBjb250aWVuZSBlbCBtZXMgc2VsZWNjaW9uYWRvIGRlbCBjYWxkZW5hcmlvIGRlIHRyYXphc1xyXG5cclxuICBjb25zdCBoYW5kbGVEYXRlQ2hhbmdlID0gKGV2ZW50KSA9PiB7IC8vIGZ1bmNpw7NuIGxsYW1hZGEgZW4gZWwgb25DaGFuZ2UgZGVsIGltcHV0IENhbGVuYXJpb1xyXG4gICAgc2V0U2VsZWN0ZWREYXRlKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgfTtcclxuXHJcblxyXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jICgpID0+IHsgIC8vIGVudmlhIGxhIGZlY2hhIGRlbCBjYWxlbmRhcmlvIGEgbGEgdXJsIHBhcmEgcXVlIHNlYSBwcm9jZXNhZGEgZW4gUHl0aG9uXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL3Byb2Nlc2FyX2ZlY2hhLycse1xyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgc2VsZWN0ZWREYXRlIH0pXHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3IgYWwgcHJvY2VzYXIgbGEgc29saWNpdHVkJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgZW52aWFyIGxhIGZlY2hhOicsIGVycm9yKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBbc3ViZm9sZGVycywgc2V0U3ViZm9sZGVyc10gPSB1c2VTdGF0ZShudWxsKTtcclxuXHJcbiAgY29uc3QgZmV0Y2hTdWJmb2xkZXJzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvcHJvY2VzYXJfZmVjaGEvXCIpOyAvLyByZWNpYmUgYSBsYSBVUkwgbG9zIGRhdG9zIGRlIGxhcyB0cmF6YXMgeSBzdXMgZGVzY29tcG9zaXRpb25cclxuICAgIGNvbnN0IGpzb25EYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBIb2xhQUFBQUFBQUEsICR7anNvbkRhdGF9YCk7XHJcbiAgICBzZXRTdWJmb2xkZXJzKGpzb25EYXRhKTtcclxuICB9O1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgZmV0Y2hTdWJmb2xkZXJzKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGZsZXgtY29sIGJnLWNsaXAtYm9yZGVyIGJnLXdoaXRlIHRleHQtZ3JheS03MDAgaC1bY2FsYygxMDB2aCldIHctZnVsbCBtYXgtdy1bMjByZW1dIHAtNCBzaGFkb3cteGwgc2hhZG93LWJsdWUtZ3JheS05MDAvNSB6LTUwXCI+XHJcbiAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCBtYi00XCI+VHJhemFzPC9oMj5cclxuICAgICAgPGlucHV0IHR5cGU9XCJtb250aFwiICBpZD1cImZlY2hhXCIgbmFtZT1cImZlY2hhXCIgb25DaGFuZ2U9e2hhbmRsZURhdGVDaGFuZ2V9Lz5cclxuICAgICAgPHA+RmVjaGEgc2VsZWNjaW9uYWRhOiB7c2VsZWN0ZWREYXRlfTwvcD5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJnLWdyZWVuLTUwMCBob3ZlcjpiZy1ncmVlbi03MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgcHktMiBweC00IHJvdW5kZWRcIiBvbkNsaWNrPXtoYW5kbGVTdWJtaXR9PkVudmlhciBGZWNoYTwvYnV0dG9uPiAgICAgXHJcbiAgICAgIDxuYXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMSBtaW4tdy1bMjQwcHhdIHAtMiBmb250LXNhbnMgdGV4dC1iYXNlIGZvbnQtbm9ybWFsIHRleHQtZ3JheS03MDBcIj5cclxuICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cInctZnVsbCBwLTIgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1ncmF5LTMwMCByb3VuZGVkXCI+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwib3BjaW9uMVwiPk9wY2nDs24gMTwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm9wY2lvbjJcIj5PcGNpw7NuIDI8L29wdGlvbj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJvcGNpb24zXCI+T3BjacOzbiAzPC9vcHRpb24+XHJcbiAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgIDwvbmF2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNpZGViYXJUcmF6YXM7Il0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiU2lkZWJhclRyYXphcyIsInNlbGVjdGVkRGF0ZSIsInNldFNlbGVjdGVkRGF0ZSIsImhhbmRsZURhdGVDaGFuZ2UiLCJldmVudCIsInRhcmdldCIsInZhbHVlIiwiaGFuZGxlU3VibWl0IiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIm9rIiwiRXJyb3IiLCJkYXRhIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInN1YmZvbGRlcnMiLCJzZXRTdWJmb2xkZXJzIiwiZmV0Y2hTdWJmb2xkZXJzIiwianNvbkRhdGEiLCJkaXYiLCJjbGFzc05hbWUiLCJoMiIsImlucHV0IiwidHlwZSIsImlkIiwibmFtZSIsIm9uQ2hhbmdlIiwicCIsImJ1dHRvbiIsImNsYXNzIiwib25DbGljayIsIm5hdiIsInNlbGVjdCIsIm9wdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/components/SidebarTrazas.js\n"));

/***/ })

});