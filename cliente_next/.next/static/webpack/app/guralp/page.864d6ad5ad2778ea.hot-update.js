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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n// Sidebar.js\n\nvar _s = $RefreshSig$();\n\nconst SidebarTrazas = ()=>{\n    _s();\n    const [selectedDate, setSelectedDate] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\"); // variable selectedDate que contiene el mes seleccionado del caldenario de trazas\n    const handleDateChange = (event)=>{\n        setSelectedDate(event.target.value);\n    };\n    const handleSubmit = async ()=>{\n        try {\n            const response = await fetch(\"http://127.0.0.1:8000/api/procesar_fecha/\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    selectedDate\n                })\n            });\n            if (!response.ok) {\n                throw new Error(\"Error al procesar la solicitud\");\n            }\n            const data = await response.json();\n            console.log(data);\n        } catch (error) {\n            console.error(\"Error al enviar la fecha:\", error);\n        }\n    };\n    const fetchSubfolders = async ()=>{\n        const response = await fetch(\"http://127.0.0.1:8000/api/procesar_fecha/\"); // recibe a la URL los datos de las trazas y sus descomposition\n        const jsonData = await response.json();\n        console.log(jsonData);\n        setData(jsonData);\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        fetchData();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"relative flex flex-col bg-clip-border bg-white text-gray-700 h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 z-50\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                className: \"text-xl font-bold mb-4\",\n                children: \"Trazas\"\n            }, void 0, false, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                lineNumber: 48,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                type: \"month\",\n                id: \"fecha\",\n                name: \"fecha\",\n                onChange: handleDateChange\n            }, void 0, false, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: [\n                    \"Fecha seleccionada: \",\n                    selectedDate\n                ]\n            }, void 0, true, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                lineNumber: 50,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                class: \"bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded\",\n                onClick: handleSubmit,\n                children: \"Enviar Fecha\"\n            }, void 0, false, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                lineNumber: 51,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                className: \"flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                    className: \"w-full p-2 bg-white border border-gray-300 rounded\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                            value: \"opcion1\",\n                            children: \"Opci\\xf3n 1\"\n                        }, void 0, false, {\n                            fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                            lineNumber: 54,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                            value: \"opcion2\",\n                            children: \"Opci\\xf3n 2\"\n                        }, void 0, false, {\n                            fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                            lineNumber: 55,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                            value: \"opcion3\",\n                            children: \"Opci\\xf3n 3\"\n                        }, void 0, false, {\n                            fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                            lineNumber: 56,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                    lineNumber: 53,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n                lineNumber: 52,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"P:\\\\jcalvaradop\\\\2024\\\\softwareOVSAI\\\\OVSAI-Repository\\\\cliente_next\\\\src\\\\app\\\\components\\\\SidebarTrazas.js\",\n        lineNumber: 47,\n        columnNumber: 5\n    }, undefined);\n};\n_s(SidebarTrazas, \"vO8h8PjMQuDzY5AHF58TfxRve7c=\");\n_c = SidebarTrazas;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SidebarTrazas);\nvar _c;\n$RefreshReg$(_c, \"SidebarTrazas\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY29tcG9uZW50cy9TaWRlYmFyVHJhemFzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxhQUFhOzs7QUFDK0I7QUFFNUMsTUFBTUUsZ0JBQWdCOztJQUVwQixNQUFNLENBQUNDLGNBQWNDLGdCQUFnQixHQUFHSCwrQ0FBUUEsQ0FBQyxLQUFLLGtGQUFrRjtJQUV4SSxNQUFNSSxtQkFBbUIsQ0FBQ0M7UUFDeEJGLGdCQUFnQkUsTUFBTUMsTUFBTSxDQUFDQyxLQUFLO0lBQ3BDO0lBR0EsTUFBTUMsZUFBZTtRQUNuQixJQUFJO1lBQ0YsTUFBTUMsV0FBVyxNQUFNQyxNQUFNLDZDQUE0QztnQkFDdkVDLFFBQVE7Z0JBQ1JDLFNBQVM7b0JBQ1AsZ0JBQWdCO2dCQUNsQjtnQkFDQUMsTUFBTUMsS0FBS0MsU0FBUyxDQUFDO29CQUFFYjtnQkFBYTtZQUN0QztZQUVBLElBQUksQ0FBQ08sU0FBU08sRUFBRSxFQUFFO2dCQUNoQixNQUFNLElBQUlDLE1BQU07WUFDbEI7WUFFQSxNQUFNQyxPQUFPLE1BQU1ULFNBQVNVLElBQUk7WUFDaENDLFFBQVFDLEdBQUcsQ0FBQ0g7UUFDZCxFQUFFLE9BQU9JLE9BQU87WUFDZEYsUUFBUUUsS0FBSyxDQUFDLDZCQUE2QkE7UUFDN0M7SUFDRjtJQUVBLE1BQU1DLGtCQUFrQjtRQUN0QixNQUFNZCxXQUFXLE1BQU1DLE1BQU0sOENBQThDLCtEQUErRDtRQUMxSSxNQUFNYyxXQUFXLE1BQU1mLFNBQVNVLElBQUk7UUFFcENDLFFBQVFDLEdBQUcsQ0FBQ0c7UUFDWkMsUUFBUUQ7SUFDVjtJQUVBekIsZ0RBQVNBLENBQUM7UUFDUjJCO0lBQ0YsR0FBRyxFQUFFO0lBRUwscUJBQ0UsOERBQUNDO1FBQUlDLFdBQVU7OzBCQUNiLDhEQUFDQztnQkFBR0QsV0FBVTswQkFBeUI7Ozs7OzswQkFDdkMsOERBQUNFO2dCQUFNQyxNQUFLO2dCQUFTQyxJQUFHO2dCQUFRQyxNQUFLO2dCQUFRQyxVQUFVOUI7Ozs7OzswQkFDdkQsOERBQUMrQjs7b0JBQUU7b0JBQXFCakM7Ozs7Ozs7MEJBQ3hCLDhEQUFDa0M7Z0JBQU9DLE9BQU07Z0JBQXlFQyxTQUFTOUI7MEJBQWM7Ozs7OzswQkFDOUcsOERBQUMrQjtnQkFBSVgsV0FBVTswQkFDYiw0RUFBQ1k7b0JBQU9aLFdBQVU7O3NDQUNoQiw4REFBQ2E7NEJBQU9sQyxPQUFNO3NDQUFVOzs7Ozs7c0NBQ3hCLDhEQUFDa0M7NEJBQU9sQyxPQUFNO3NDQUFVOzs7Ozs7c0NBQ3hCLDhEQUFDa0M7NEJBQU9sQyxPQUFNO3NDQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtsQztHQXpETU47S0FBQUE7QUEyRE4sK0RBQWVBLGFBQWFBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9jb21wb25lbnRzL1NpZGViYXJUcmF6YXMuanM/MzJhNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTaWRlYmFyLmpzXHJcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmNvbnN0IFNpZGViYXJUcmF6YXMgPSAoKSA9PiB7XHJcblxyXG4gIGNvbnN0IFtzZWxlY3RlZERhdGUsIHNldFNlbGVjdGVkRGF0ZV0gPSB1c2VTdGF0ZSgnJyk7IC8vIHZhcmlhYmxlIHNlbGVjdGVkRGF0ZSBxdWUgY29udGllbmUgZWwgbWVzIHNlbGVjY2lvbmFkbyBkZWwgY2FsZGVuYXJpbyBkZSB0cmF6YXNcclxuXHJcbiAgY29uc3QgaGFuZGxlRGF0ZUNoYW5nZSA9IChldmVudCkgPT4geyAvLyBmdW5jacOzbiBsbGFtYWRhIGVuIGVsIG9uQ2hhbmdlIGRlbCBpbXB1dCBDYWxlbmFyaW9cclxuICAgIHNldFNlbGVjdGVkRGF0ZShldmVudC50YXJnZXQudmFsdWUpO1xyXG4gIH07XHJcblxyXG5cclxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoKSA9PiB7ICAvLyBlbnZpYSBsYSBmZWNoYSBkZWwgY2FsZW5kYXJpbyBhIGxhIHVybCBwYXJhIHF1ZSBzZWEgcHJvY2VzYWRhIGVuIFB5dGhvblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS9wcm9jZXNhcl9mZWNoYS8nLHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHNlbGVjdGVkRGF0ZSB9KVxyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGFsIHByb2Nlc2FyIGxhIHNvbGljaXR1ZCcpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGVudmlhciBsYSBmZWNoYTonLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZmV0Y2hTdWJmb2xkZXJzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvcHJvY2VzYXJfZmVjaGEvXCIpOyAvLyByZWNpYmUgYSBsYSBVUkwgbG9zIGRhdG9zIGRlIGxhcyB0cmF6YXMgeSBzdXMgZGVzY29tcG9zaXRpb25cclxuICAgIGNvbnN0IGpzb25EYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGpzb25EYXRhKTtcclxuICAgIHNldERhdGEoanNvbkRhdGEpO1xyXG4gIH07XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBmZXRjaERhdGEoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggZmxleC1jb2wgYmctY2xpcC1ib3JkZXIgYmctd2hpdGUgdGV4dC1ncmF5LTcwMCBoLVtjYWxjKDEwMHZoKV0gdy1mdWxsIG1heC13LVsyMHJlbV0gcC00IHNoYWRvdy14bCBzaGFkb3ctYmx1ZS1ncmF5LTkwMC81IHotNTBcIj5cclxuICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIG1iLTRcIj5UcmF6YXM8L2gyPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cIm1vbnRoXCIgIGlkPVwiZmVjaGFcIiBuYW1lPVwiZmVjaGFcIiBvbkNoYW5nZT17aGFuZGxlRGF0ZUNoYW5nZX0vPlxyXG4gICAgICA8cD5GZWNoYSBzZWxlY2Npb25hZGE6IHtzZWxlY3RlZERhdGV9PC9wPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYmctZ3JlZW4tNTAwIGhvdmVyOmJnLWdyZWVuLTcwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCBweS0yIHB4LTQgcm91bmRlZFwiIG9uQ2xpY2s9e2hhbmRsZVN1Ym1pdH0+RW52aWFyIEZlY2hhPC9idXR0b24+ICAgICBcclxuICAgICAgPG5hdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0xIG1pbi13LVsyNDBweF0gcC0yIGZvbnQtc2FucyB0ZXh0LWJhc2UgZm9udC1ub3JtYWwgdGV4dC1ncmF5LTcwMFwiPlxyXG4gICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwidy1mdWxsIHAtMiBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWRcIj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJvcGNpb24xXCI+T3BjacOzbiAxPC9vcHRpb24+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwib3BjaW9uMlwiPk9wY2nDs24gMjwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm9wY2lvbjNcIj5PcGNpw7NuIDM8L29wdGlvbj5cclxuICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgPC9uYXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2lkZWJhclRyYXphczsiXSwibmFtZXMiOlsidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJTaWRlYmFyVHJhemFzIiwic2VsZWN0ZWREYXRlIiwic2V0U2VsZWN0ZWREYXRlIiwiaGFuZGxlRGF0ZUNoYW5nZSIsImV2ZW50IiwidGFyZ2V0IiwidmFsdWUiLCJoYW5kbGVTdWJtaXQiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5Iiwib2siLCJFcnJvciIsImRhdGEiLCJqc29uIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwiZmV0Y2hTdWJmb2xkZXJzIiwianNvbkRhdGEiLCJzZXREYXRhIiwiZmV0Y2hEYXRhIiwiZGl2IiwiY2xhc3NOYW1lIiwiaDIiLCJpbnB1dCIsInR5cGUiLCJpZCIsIm5hbWUiLCJvbkNoYW5nZSIsInAiLCJidXR0b24iLCJjbGFzcyIsIm9uQ2xpY2siLCJuYXYiLCJzZWxlY3QiLCJvcHRpb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/components/SidebarTrazas.js\n"));

/***/ })

});