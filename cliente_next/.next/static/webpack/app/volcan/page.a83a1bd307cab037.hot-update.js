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

/***/ "(app-pages-browser)/./src/app/components/SidebarTrazas.js":
/*!*********************************************!*\
  !*** ./src/app/components/SidebarTrazas.js ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n// Sidebar.js\n\nvar _s = $RefreshSig$();\n\nconst SidebarTrazas = ()=>{\n    _s();\n    const [selectedDate, setSelectedDate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"); // variable selectedDate que contiene el mes seleccionado del caldenario de trazas\n    const handleDateChange = (event)=>{\n        setSelectedDate(event.target.value);\n    };\n    const handleSubmit = async ()=>{\n        try {\n            const response = await fetch(\"http://127.0.0.1:8000/api/procesar_fecha/\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    selectedDate\n                })\n            });\n            if (!response.ok) {\n                throw new Error(\"Error al procesar la solicitud\");\n            }\n            const data = await response.json();\n            console.log(data);\n        } catch (error) {\n            console.error(\"Error al enviar la fecha:\", error);\n        }\n    };\n    const [subfolders, setSubfolders] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const fetchSubfolders = async ()=>{\n        const response = await fetch(\"http://127.0.0.1:8000/api/procesar_fecha/\"); // recibe a la URL los datos de las trazas y sus descomposition\n        const jsonData = await response.json();\n        console.log(jsonData);\n        setSubfolders(jsonData);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        fetchSubfolders();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"relative flex flex-col bg-clip-border bg-white text-gray-700 h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-50\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                className: \"text-xl font-bold mb-4\",\n                children: \"Trazas\"\n            }, void 0, false, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                lineNumber: 50,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                type: \"month\",\n                id: \"fecha\",\n                name: \"fecha\",\n                onChange: handleDateChange\n            }, void 0, false, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                lineNumber: 51,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: [\n                    \"Fecha seleccionada: \",\n                    selectedDate\n                ]\n            }, void 0, true, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                lineNumber: 52,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                class: \"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded\",\n                onClick: handleSubmit,\n                children: \"Enviar Fecha\"\n            }, void 0, false, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                lineNumber: 53,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                className: \"flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                    className: \"w-full p-2 bg-white border border-gray-300 rounded\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                            value: \"opcion1\",\n                            children: \"Opci\\xf3n 1\"\n                        }, void 0, false, {\n                            fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                            lineNumber: 56,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                            value: \"opcion2\",\n                            children: \"Opci\\xf3n 2\"\n                        }, void 0, false, {\n                            fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                            lineNumber: 57,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                            value: \"opcion3\",\n                            children: \"Opci\\xf3n 3\"\n                        }, void 0, false, {\n                            fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                            lineNumber: 58,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                    lineNumber: 55,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                lineNumber: 54,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n        lineNumber: 49,\n        columnNumber: 5\n    }, undefined);\n};\n_s(SidebarTrazas, \"2QMOB3aLMIjex6FQfbxrandbxgg=\");\n_c = SidebarTrazas;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SidebarTrazas);\nvar _c;\n$RefreshReg$(_c, \"SidebarTrazas\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY29tcG9uZW50cy9TaWRlYmFyVHJhemFzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxhQUFhOzs7QUFDK0I7QUFFNUMsTUFBTUUsZ0JBQWdCOztJQUVwQixNQUFNLENBQUNDLGNBQWNDLGdCQUFnQixHQUFHSCwrQ0FBUUEsQ0FBQyxLQUFLLGtGQUFrRjtJQUV4SSxNQUFNSSxtQkFBbUIsQ0FBQ0M7UUFDeEJGLGdCQUFnQkUsTUFBTUMsTUFBTSxDQUFDQyxLQUFLO0lBQ3BDO0lBR0EsTUFBTUMsZUFBZTtRQUNuQixJQUFJO1lBQ0YsTUFBTUMsV0FBVyxNQUFNQyxNQUFNLDZDQUE0QztnQkFDdkVDLFFBQVE7Z0JBQ1JDLFNBQVM7b0JBQ1AsZ0JBQWdCO2dCQUNsQjtnQkFDQUMsTUFBTUMsS0FBS0MsU0FBUyxDQUFDO29CQUFFYjtnQkFBYTtZQUN0QztZQUVBLElBQUksQ0FBQ08sU0FBU08sRUFBRSxFQUFFO2dCQUNoQixNQUFNLElBQUlDLE1BQU07WUFDbEI7WUFFQSxNQUFNQyxPQUFPLE1BQU1ULFNBQVNVLElBQUk7WUFDaENDLFFBQVFDLEdBQUcsQ0FBQ0g7UUFDZCxFQUFFLE9BQU9JLE9BQU87WUFDZEYsUUFBUUUsS0FBSyxDQUFDLDZCQUE2QkE7UUFDN0M7SUFDRjtJQUVBLE1BQU0sQ0FBQ0MsWUFBWUMsY0FBYyxHQUFHeEIsK0NBQVFBLENBQUM7SUFFN0MsTUFBTXlCLGtCQUFrQjtRQUN0QixNQUFNaEIsV0FBVyxNQUFNQyxNQUFNLDhDQUE4QywrREFBK0Q7UUFDMUksTUFBTWdCLFdBQVcsTUFBTWpCLFNBQVNVLElBQUk7UUFFcENDLFFBQVFDLEdBQUcsQ0FBQ0s7UUFDWkYsY0FBY0U7SUFDaEI7SUFFQTNCLGdEQUFTQSxDQUFDO1FBQ1IwQjtJQUNGLEdBQUcsRUFBRTtJQUVMLHFCQUNFLDhEQUFDRTtRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0M7Z0JBQUdELFdBQVU7MEJBQXlCOzs7Ozs7MEJBQ3ZDLDhEQUFDRTtnQkFBTUMsTUFBSztnQkFBU0MsSUFBRztnQkFBUUMsTUFBSztnQkFBUUMsVUFBVTlCOzs7Ozs7MEJBQ3ZELDhEQUFDK0I7O29CQUFFO29CQUFxQmpDOzs7Ozs7OzBCQUN4Qiw4REFBQ2tDO2dCQUFPQyxPQUFNO2dCQUF5RUMsU0FBUzlCOzBCQUFjOzs7Ozs7MEJBQzlHLDhEQUFDK0I7Z0JBQUlYLFdBQVU7MEJBQ2IsNEVBQUNZO29CQUFPWixXQUFVOztzQ0FDaEIsOERBQUNhOzRCQUFPbEMsT0FBTTtzQ0FBVTs7Ozs7O3NDQUN4Qiw4REFBQ2tDOzRCQUFPbEMsT0FBTTtzQ0FBVTs7Ozs7O3NDQUN4Qiw4REFBQ2tDOzRCQUFPbEMsT0FBTTtzQ0FBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLbEM7R0EzRE1OO0tBQUFBO0FBNkROLCtEQUFlQSxhQUFhQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvY29tcG9uZW50cy9TaWRlYmFyVHJhemFzLmpzPzMyYTUiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gU2lkZWJhci5qc1xyXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG5jb25zdCBTaWRlYmFyVHJhemFzID0gKCkgPT4ge1xyXG5cclxuICBjb25zdCBbc2VsZWN0ZWREYXRlLCBzZXRTZWxlY3RlZERhdGVdID0gdXNlU3RhdGUoJycpOyAvLyB2YXJpYWJsZSBzZWxlY3RlZERhdGUgcXVlIGNvbnRpZW5lIGVsIG1lcyBzZWxlY2Npb25hZG8gZGVsIGNhbGRlbmFyaW8gZGUgdHJhemFzXHJcblxyXG4gIGNvbnN0IGhhbmRsZURhdGVDaGFuZ2UgPSAoZXZlbnQpID0+IHsgLy8gZnVuY2nDs24gbGxhbWFkYSBlbiBlbCBvbkNoYW5nZSBkZWwgaW1wdXQgQ2FsZW5hcmlvXHJcbiAgICBzZXRTZWxlY3RlZERhdGUoZXZlbnQudGFyZ2V0LnZhbHVlKTtcclxuICB9O1xyXG5cclxuXHJcbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKCkgPT4geyAgLy8gZW52aWEgbGEgZmVjaGEgZGVsIGNhbGVuZGFyaW8gYSBsYSB1cmwgcGFyYSBxdWUgc2VhIHByb2Nlc2FkYSBlbiBQeXRob25cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvcHJvY2VzYXJfZmVjaGEvJyx7XHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBzZWxlY3RlZERhdGUgfSlcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBhbCBwcm9jZXNhciBsYSBzb2xpY2l0dWQnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhbCBlbnZpYXIgbGEgZmVjaGE6JywgZXJyb3IpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IFtzdWJmb2xkZXJzLCBzZXRTdWJmb2xkZXJzXSA9IHVzZVN0YXRlKG51bGwpO1xyXG5cclxuICBjb25zdCBmZXRjaFN1YmZvbGRlcnMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS9wcm9jZXNhcl9mZWNoYS9cIik7IC8vIHJlY2liZSBhIGxhIFVSTCBsb3MgZGF0b3MgZGUgbGFzIHRyYXphcyB5IHN1cyBkZXNjb21wb3NpdGlvblxyXG4gICAgY29uc3QganNvbkRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coanNvbkRhdGEpO1xyXG4gICAgc2V0U3ViZm9sZGVycyhqc29uRGF0YSk7XHJcbiAgfTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGZldGNoU3ViZm9sZGVycygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleCBmbGV4LWNvbCBiZy1jbGlwLWJvcmRlciBiZy13aGl0ZSB0ZXh0LWdyYXktNzAwIGgtW2NhbGMoMTAwdmgpXSB3LWZ1bGwgbWF4LXctWzIwcmVtXSBwLTQgc2hhZG93LXhsIHNoYWRvdy1ibHVlLWdyYXktOTAwLzUgei01MFwiPlxyXG4gICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgbWItNFwiPlRyYXphczwvaDI+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwibW9udGhcIiAgaWQ9XCJmZWNoYVwiIG5hbWU9XCJmZWNoYVwiIG9uQ2hhbmdlPXtoYW5kbGVEYXRlQ2hhbmdlfS8+XHJcbiAgICAgIDxwPkZlY2hhIHNlbGVjY2lvbmFkYToge3NlbGVjdGVkRGF0ZX08L3A+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJiZy1ncmVlbi01MDAgaG92ZXI6YmctZ3JlZW4tNzAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHB5LTIgcHgtNCByb3VuZGVkXCIgb25DbGljaz17aGFuZGxlU3VibWl0fT5FbnZpYXIgRmVjaGE8L2J1dHRvbj4gICAgIFxyXG4gICAgICA8bmF2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTEgbWluLXctWzI0MHB4XSBwLTIgZm9udC1zYW5zIHRleHQtYmFzZSBmb250LW5vcm1hbCB0ZXh0LWdyYXktNzAwXCI+XHJcbiAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJ3LWZ1bGwgcC0yIGJnLXdoaXRlIGJvcmRlciBib3JkZXItZ3JheS0zMDAgcm91bmRlZFwiPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm9wY2lvbjFcIj5PcGNpw7NuIDE8L29wdGlvbj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJvcGNpb24yXCI+T3BjacOzbiAyPC9vcHRpb24+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwib3BjaW9uM1wiPk9wY2nDs24gMzwvb3B0aW9uPlxyXG4gICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICA8L25hdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaWRlYmFyVHJhemFzOyJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIlNpZGViYXJUcmF6YXMiLCJzZWxlY3RlZERhdGUiLCJzZXRTZWxlY3RlZERhdGUiLCJoYW5kbGVEYXRlQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJ2YWx1ZSIsImhhbmRsZVN1Ym1pdCIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvayIsIkVycm9yIiwiZGF0YSIsImpzb24iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzdWJmb2xkZXJzIiwic2V0U3ViZm9sZGVycyIsImZldGNoU3ViZm9sZGVycyIsImpzb25EYXRhIiwiZGl2IiwiY2xhc3NOYW1lIiwiaDIiLCJpbnB1dCIsInR5cGUiLCJpZCIsIm5hbWUiLCJvbkNoYW5nZSIsInAiLCJidXR0b24iLCJjbGFzcyIsIm9uQ2xpY2siLCJuYXYiLCJzZWxlY3QiLCJvcHRpb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/components/SidebarTrazas.js\n"));

/***/ })

});