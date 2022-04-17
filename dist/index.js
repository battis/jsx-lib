(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["BattisJsxLib"] = factory();
	else
		root["BattisJsxLib"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Text = exports.GetRequestParameters = exports.Query = exports.expirationToDate = exports.Cookie = exports.Browser = void 0;
const Browser_1 = __importDefault(__webpack_require__(/*! ./src/Browser */ "./src/Browser.ts"));
exports.Browser = Browser_1.default;
const Cookie_1 = __importStar(__webpack_require__(/*! ./src/Cookie */ "./src/Cookie.ts"));
exports.Cookie = Cookie_1.default;
Object.defineProperty(exports, "expirationToDate", ({ enumerable: true, get: function () { return Cookie_1.expirationToDate; } }));
const Query_1 = __importStar(__webpack_require__(/*! ./src/Query */ "./src/Query.ts"));
exports.Query = Query_1.default;
Object.defineProperty(exports, "GetRequestParameters", ({ enumerable: true, get: function () { return Query_1.GetRequestParameters; } }));
const Text_1 = __importDefault(__webpack_require__(/*! ./src/Text */ "./src/Text.ts"));
exports.Text = Text_1.default;


/***/ }),

/***/ "./src/Browser.ts":
/*!************************!*\
  !*** ./src/Browser.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Browser {
    /**
     * @see {@link https://stackoverflow.com/a/9869822/294171|Stack Overflow}
     * @param element
     */
    static allowSelectAndBlur(element) {
        element.addEventListener('mousedown', event => event.preventDefault());
    }
}
exports["default"] = Browser;
Browser.iOS = class {
    /**
     * @see {@link https://stackoverflow.com/a/29696509/294171|Stack Overflow}
     */
    static isMobileSafari() {
        const ua = window.navigator.userAgent;
        const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
        const webkit = !!ua.match(/WebKit/i);
        return iOS && webkit && !ua.match(/CriOS/i);
    }
    /**
     * @see {@link https://stackoverflow.com/questions/7970389/ios-5-fixed-positioning-and-virtual-keyboard|Stack Overflow}
     * @param element
     * @param top
     */
    static mobileSafariKeyboardFixedElement(element, top = '0px') {
        if (Browser.iOS.isMobileSafari()) {
            const handleScrollingKeyboard = () => {
                element.style.top = `calc(${window.scrollY}px + ${top})`;
            };
            const handle_iOSKeyboardAppear = () => {
                element.style.position = 'absolute';
                handleScrollingKeyboard();
                document.addEventListener('scroll', handleScrollingKeyboard);
            };
            const handle_iOSKeyboardRemove = () => {
                element.style.position = 'fixed';
                element.style.top = top;
                document.removeEventListener('scroll', handleScrollingKeyboard);
            };
            element.addEventListener('focus', handle_iOSKeyboardAppear, {
                capture: true
            });
            element.addEventListener('blur', handle_iOSKeyboardRemove, {
                capture: true
            });
        }
        return element;
    }
};


/***/ }),

/***/ "./src/Cookie.ts":
/*!***********************!*\
  !*** ./src/Cookie.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports) {


var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.expirationToDate = void 0;
function expirationToDate(expiration) {
    switch (typeof expiration) {
        case 'number':
            // assume it's a Javascript timestamp
            expiration = new Date(expiration);
            break;
        case 'object':
            if (!(expiration instanceof Date)) {
                let multiplier = 1;
                // noinspection FallThroughInSwitchStatementJS
                switch (expiration.unit) {
                    case 'weeks':
                        multiplier *= 7;
                    case 'days':
                        multiplier *= 24;
                    case 'hours':
                        multiplier *= 60;
                    case 'minutes':
                        multiplier *= 60;
                    case 'seconds':
                        multiplier *= 1000;
                }
                expiration = new Date(Date.now() + expiration.expires_in * multiplier);
            }
    }
    return expiration;
}
exports.expirationToDate = expirationToDate;
function escapeSemicolon(raw) {
    return raw.replace(/;/g, ';');
}
class Cookie {
    static set(_a) {
        var { name, value, path = '/' } = _a, params = __rest(_a, ["name", "value", "path"]);
        let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${escapeSemicolon(path)}`;
        for (const param in params) {
            switch (param) {
                case 'secure':
                case 'samesite':
                    if (params[param] !== true) {
                        cookie += `; ${param}`;
                    }
                    break;
                case 'maxAgeInSeconds':
                    if (typeof params[param] === 'number') {
                        cookie += `; max-age=${params[param]}`;
                    }
                    break;
                case 'expires':
                    params[param] = expirationToDate(params[param]).toUTCString();
                default:
                    cookie += `; ${param}=${escapeSemicolon(params[param])}`;
            }
        }
        document.cookie = cookie;
    }
    static get(name) {
        const matches = document.cookie.match(new RegExp(`(?:^|; )${encodeURIComponent(name)}=([^;]*)`));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    static delete(name) {
        this.set({ name, value: '', maxAgeInSeconds: -1 });
    }
}
exports["default"] = Cookie;


/***/ }),

/***/ "./src/Query.ts":
/*!**********************!*\
  !*** ./src/Query.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetRequestParameters = void 0;
class GetRequestParameters {
}
exports.GetRequestParameters = GetRequestParameters;
class Query {
    static queryString(parameters) {
        return Object.keys(parameters)
            .map((key) => `${key}=${encodeURIComponent(parameters[key])}`)
            .join('&');
    }
    /**
     * @see https://stackoverflow.com/a/8486188
     * @param url
     */
    static parseGetParameters(url) {
        if (!url) {
            url = location.href;
        }
        const question = url.indexOf('?');
        let hash = url.indexOf('#');
        if (hash == -1 && question == -1) {
            return {};
        }
        if (hash == -1) {
            hash = url.length;
        }
        const query = question == -1 || hash == question + 1 ? url.substring(hash) :
            url.substring(question + 1, hash);
        const result = {};
        query.split('&').forEach(function (part) {
            if (!part) {
                return;
            }
            part = part.split('+').join(' '); // replace every + with space, regexp-free version
            const eq = part.indexOf('=');
            let key = eq > -1 ? part.substr(0, eq) : part;
            const val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : '';
            const from = key.indexOf('[');
            if (from == -1) {
                result[decodeURIComponent(key)] = val;
            }
            else {
                const to = key.indexOf(']', from);
                const index = decodeURIComponent(key.substring(from + 1, to));
                key = decodeURIComponent(key.substring(0, from));
                if (!result[key]) {
                    result[key] = [];
                }
                if (!index) {
                    result[key].push(val);
                }
                else {
                    result[key][index] = val;
                }
            }
        });
        return result;
    }
    /**
     * @see {@link https://stackoverflow.com/a/40552372|Stack Overflow}
     * @param obj
     */
    static getFormData(obj) {
        return Object.keys(obj).reduce((formData, key) => {
            formData.append(key, obj[key]);
            return formData;
        }, new FormData());
    }
}
exports["default"] = Query;


/***/ }),

/***/ "./src/Text.ts":
/*!*********************!*\
  !*** ./src/Text.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Text {
    /**
     * @see {@link https://capitalizemytitle.com/#capitalizationrules|TODO jazz this one up}
     * @param text
     * @param ignore
     */
    static titleCase(text, ignore = ['a', 'and', 'as', 'for', 'of', 'or', 'the', 'to']) {
        let capitalize = true;
        const ignorePattern = new RegExp(`^(${ignore.join('|')})(\\W+.*)*$`, 'i');
        text = text.toLowerCase();
        for (let i = 0; i < text.length; i++) {
            if (/[a-z]/i.test(text[i]) && capitalize) {
                if (i === 0 || !ignorePattern.test(text.slice(i))) {
                    text =
                        text.slice(0, i) +
                            text[i].toUpperCase() +
                            text.slice(i + 1);
                }
                capitalize = false;
            }
            else {
                capitalize = /\W/.test(text[i]);
            }
        }
        return text;
    }
    static camelCase(text, mustStartWithAlpha = false, splitter = /[^a-z0-9]+/i) {
        text = text
            .split(splitter)
            .map(token => token.charAt(0).toUpperCase() +
            token.substr(1).toLowerCase())
            .join('');
        if (mustStartWithAlpha) {
            text = text.replace(/^[^a-z]+/i, '');
        }
        return text.charAt(0).toLowerCase() + text.substr(1);
    }
    static unCamelCase(text) {
        return text
            .replace(/([^0-9 ])([0-9])/g, '$1 $2')
            .replace(/([^A-Z ])([A-Z])/g, '$1 $2');
    }
    static oxfordCommaList(list) {
        return list.join(', ').replace(/, ([^,]+)$/, `${list.length > 2 ? ',' : ''} and $1`);
    }
    /**
     * @see https://www.php.net/manual/en/function.boolval.php
     */
    static scalarToBool(value) {
        switch (typeof value) {
            case 'boolean':
                return value;
            case 'number':
                return value != 0;
            case 'string':
                switch (value.toLowerCase()) {
                    case '':
                    case 'false':
                    case 'no':
                    case '0':
                        return false;
                    default:
                        return true;
                }
            default:
                return !(value === undefined || value === null);
        }
    }
    static isBooleanValue(text) {
        if (typeof text === 'string') {
            switch (text.toLowerCase()) {
                case 'true':
                case 'false':
                case 'yes':
                case 'no':
                case '0':
                case '1':
                    return true;
            }
        }
        return false;
    }
}
exports["default"] = Text;
Text.PlaceholderString = class extends String {
    constructor(config, ...rest) {
        super(...rest);
        this._config = config;
    }
    finalize(...args) {
        let text = this.valueOf();
        for (const placeholder of Object.keys(this._config)) {
            text = text.replace(placeholder, this._config['' + placeholder](...args));
        }
        return text;
    }
};


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0JhdHRpc0pzeExpYi93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vQmF0dGlzSnN4TGliLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vQmF0dGlzSnN4TGliLy4vc3JjL0Jyb3dzZXIudHMiLCJ3ZWJwYWNrOi8vQmF0dGlzSnN4TGliLy4vc3JjL0Nvb2tpZS50cyIsIndlYnBhY2s6Ly9CYXR0aXNKc3hMaWIvLi9zcmMvUXVlcnkudHMiLCJ3ZWJwYWNrOi8vQmF0dGlzSnN4TGliLy4vc3JjL1RleHQudHMiLCJ3ZWJwYWNrOi8vQmF0dGlzSnN4TGliL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0JhdHRpc0pzeExpYi93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL0JhdHRpc0pzeExpYi93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vQmF0dGlzSnN4TGliL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJCYXR0aXNKc3hMaWJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQmF0dGlzSnN4TGliXCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgKCkgPT4ge1xucmV0dXJuICIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlRleHQgPSBleHBvcnRzLkdldFJlcXVlc3RQYXJhbWV0ZXJzID0gZXhwb3J0cy5RdWVyeSA9IGV4cG9ydHMuZXhwaXJhdGlvblRvRGF0ZSA9IGV4cG9ydHMuQ29va2llID0gZXhwb3J0cy5Ccm93c2VyID0gdm9pZCAwO1xuY29uc3QgQnJvd3Nlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3NyYy9Ccm93c2VyXCIpKTtcbmV4cG9ydHMuQnJvd3NlciA9IEJyb3dzZXJfMS5kZWZhdWx0O1xuY29uc3QgQ29va2llXzEgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIi4vc3JjL0Nvb2tpZVwiKSk7XG5leHBvcnRzLkNvb2tpZSA9IENvb2tpZV8xLmRlZmF1bHQ7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJleHBpcmF0aW9uVG9EYXRlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBDb29raWVfMS5leHBpcmF0aW9uVG9EYXRlOyB9IH0pO1xuY29uc3QgUXVlcnlfMSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9zcmMvUXVlcnlcIikpO1xuZXhwb3J0cy5RdWVyeSA9IFF1ZXJ5XzEuZGVmYXVsdDtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkdldFJlcXVlc3RQYXJhbWV0ZXJzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBRdWVyeV8xLkdldFJlcXVlc3RQYXJhbWV0ZXJzOyB9IH0pO1xuY29uc3QgVGV4dF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL3NyYy9UZXh0XCIpKTtcbmV4cG9ydHMuVGV4dCA9IFRleHRfMS5kZWZhdWx0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBCcm93c2VyIHtcbiAgICAvKipcbiAgICAgKiBAc2VlIHtAbGluayBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvOTg2OTgyMi8yOTQxNzF8U3RhY2sgT3ZlcmZsb3d9XG4gICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgKi9cbiAgICBzdGF0aWMgYWxsb3dTZWxlY3RBbmRCbHVyKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBldmVudCA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBCcm93c2VyO1xuQnJvd3Nlci5pT1MgPSBjbGFzcyB7XG4gICAgLyoqXG4gICAgICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI5Njk2NTA5LzI5NDE3MXxTdGFjayBPdmVyZmxvd31cbiAgICAgKi9cbiAgICBzdGF0aWMgaXNNb2JpbGVTYWZhcmkoKSB7XG4gICAgICAgIGNvbnN0IHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgICAgIGNvbnN0IGlPUyA9ICEhdWEubWF0Y2goL2lQYWQvaSkgfHwgISF1YS5tYXRjaCgvaVBob25lL2kpO1xuICAgICAgICBjb25zdCB3ZWJraXQgPSAhIXVhLm1hdGNoKC9XZWJLaXQvaSk7XG4gICAgICAgIHJldHVybiBpT1MgJiYgd2Via2l0ICYmICF1YS5tYXRjaCgvQ3JpT1MvaSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBzZWUge0BsaW5rIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzc5NzAzODkvaW9zLTUtZml4ZWQtcG9zaXRpb25pbmctYW5kLXZpcnR1YWwta2V5Ym9hcmR8U3RhY2sgT3ZlcmZsb3d9XG4gICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gdG9wXG4gICAgICovXG4gICAgc3RhdGljIG1vYmlsZVNhZmFyaUtleWJvYXJkRml4ZWRFbGVtZW50KGVsZW1lbnQsIHRvcCA9ICcwcHgnKSB7XG4gICAgICAgIGlmIChCcm93c2VyLmlPUy5pc01vYmlsZVNhZmFyaSgpKSB7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVTY3JvbGxpbmdLZXlib2FyZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IGBjYWxjKCR7d2luZG93LnNjcm9sbFl9cHggKyAke3RvcH0pYDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVfaU9TS2V5Ym9hcmRBcHBlYXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgICAgICAgaGFuZGxlU2Nyb2xsaW5nS2V5Ym9hcmQoKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBoYW5kbGVTY3JvbGxpbmdLZXlib2FyZCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgaGFuZGxlX2lPU0tleWJvYXJkUmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUudG9wID0gdG9wO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGhhbmRsZVNjcm9sbGluZ0tleWJvYXJkKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgaGFuZGxlX2lPU0tleWJvYXJkQXBwZWFyLCB7XG4gICAgICAgICAgICAgICAgY2FwdHVyZTogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBoYW5kbGVfaU9TS2V5Ym9hcmRSZW1vdmUsIHtcbiAgICAgICAgICAgICAgICBjYXB0dXJlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmV4cGlyYXRpb25Ub0RhdGUgPSB2b2lkIDA7XG5mdW5jdGlvbiBleHBpcmF0aW9uVG9EYXRlKGV4cGlyYXRpb24pIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBleHBpcmF0aW9uKSB7XG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAvLyBhc3N1bWUgaXQncyBhIEphdmFzY3JpcHQgdGltZXN0YW1wXG4gICAgICAgICAgICBleHBpcmF0aW9uID0gbmV3IERhdGUoZXhwaXJhdGlvbik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgIGlmICghKGV4cGlyYXRpb24gaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICAgICAgICAgIGxldCBtdWx0aXBsaWVyID0gMTtcbiAgICAgICAgICAgICAgICAvLyBub2luc3BlY3Rpb24gRmFsbFRocm91Z2hJblN3aXRjaFN0YXRlbWVudEpTXG4gICAgICAgICAgICAgICAgc3dpdGNoIChleHBpcmF0aW9uLnVuaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnd2Vla3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGllciAqPSA3O1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdkYXlzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIgKj0gMjQ7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIgKj0gNjA7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGllciAqPSA2MDtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyICo9IDEwMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV4cGlyYXRpb24gPSBuZXcgRGF0ZShEYXRlLm5vdygpICsgZXhwaXJhdGlvbi5leHBpcmVzX2luICogbXVsdGlwbGllcik7XG4gICAgICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBleHBpcmF0aW9uO1xufVxuZXhwb3J0cy5leHBpcmF0aW9uVG9EYXRlID0gZXhwaXJhdGlvblRvRGF0ZTtcbmZ1bmN0aW9uIGVzY2FwZVNlbWljb2xvbihyYXcpIHtcbiAgICByZXR1cm4gcmF3LnJlcGxhY2UoLzsvZywgJzsnKTtcbn1cbmNsYXNzIENvb2tpZSB7XG4gICAgc3RhdGljIHNldChfYSkge1xuICAgICAgICB2YXIgeyBuYW1lLCB2YWx1ZSwgcGF0aCA9ICcvJyB9ID0gX2EsIHBhcmFtcyA9IF9fcmVzdChfYSwgW1wibmFtZVwiLCBcInZhbHVlXCIsIFwicGF0aFwiXSk7XG4gICAgICAgIGxldCBjb29raWUgPSBgJHtlbmNvZGVVUklDb21wb25lbnQobmFtZSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKX07IHBhdGg9JHtlc2NhcGVTZW1pY29sb24ocGF0aCl9YDtcbiAgICAgICAgZm9yIChjb25zdCBwYXJhbSBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgIHN3aXRjaCAocGFyYW0pIHtcbiAgICAgICAgICAgICAgICBjYXNlICdzZWN1cmUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3NhbWVzaXRlJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtc1twYXJhbV0gIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvb2tpZSArPSBgOyAke3BhcmFtfWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbWF4QWdlSW5TZWNvbmRzJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXNbcGFyYW1dID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29va2llICs9IGA7IG1heC1hZ2U9JHtwYXJhbXNbcGFyYW1dfWA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXhwaXJlcyc6XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtc1twYXJhbV0gPSBleHBpcmF0aW9uVG9EYXRlKHBhcmFtc1twYXJhbV0pLnRvVVRDU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgY29va2llICs9IGA7ICR7cGFyYW19PSR7ZXNjYXBlU2VtaWNvbG9uKHBhcmFtc1twYXJhbV0pfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0KG5hbWUpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKGAoPzpefDsgKSR7ZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpfT0oW147XSopYCkpO1xuICAgICAgICByZXR1cm4gbWF0Y2hlcyA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaGVzWzFdKSA6IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgc3RhdGljIGRlbGV0ZShuYW1lKSB7XG4gICAgICAgIHRoaXMuc2V0KHsgbmFtZSwgdmFsdWU6ICcnLCBtYXhBZ2VJblNlY29uZHM6IC0xIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IENvb2tpZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5HZXRSZXF1ZXN0UGFyYW1ldGVycyA9IHZvaWQgMDtcbmNsYXNzIEdldFJlcXVlc3RQYXJhbWV0ZXJzIHtcbn1cbmV4cG9ydHMuR2V0UmVxdWVzdFBhcmFtZXRlcnMgPSBHZXRSZXF1ZXN0UGFyYW1ldGVycztcbmNsYXNzIFF1ZXJ5IHtcbiAgICBzdGF0aWMgcXVlcnlTdHJpbmcocGFyYW1ldGVycykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMocGFyYW1ldGVycylcbiAgICAgICAgICAgIC5tYXAoKGtleSkgPT4gYCR7a2V5fT0ke2VuY29kZVVSSUNvbXBvbmVudChwYXJhbWV0ZXJzW2tleV0pfWApXG4gICAgICAgICAgICAuam9pbignJicpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAc2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS84NDg2MTg4XG4gICAgICogQHBhcmFtIHVybFxuICAgICAqL1xuICAgIHN0YXRpYyBwYXJzZUdldFBhcmFtZXRlcnModXJsKSB7XG4gICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICB1cmwgPSBsb2NhdGlvbi5ocmVmO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uID0gdXJsLmluZGV4T2YoJz8nKTtcbiAgICAgICAgbGV0IGhhc2ggPSB1cmwuaW5kZXhPZignIycpO1xuICAgICAgICBpZiAoaGFzaCA9PSAtMSAmJiBxdWVzdGlvbiA9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNoID09IC0xKSB7XG4gICAgICAgICAgICBoYXNoID0gdXJsLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBxdWVyeSA9IHF1ZXN0aW9uID09IC0xIHx8IGhhc2ggPT0gcXVlc3Rpb24gKyAxID8gdXJsLnN1YnN0cmluZyhoYXNoKSA6XG4gICAgICAgICAgICB1cmwuc3Vic3RyaW5nKHF1ZXN0aW9uICsgMSwgaGFzaCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgICAgICBxdWVyeS5zcGxpdCgnJicpLmZvckVhY2goZnVuY3Rpb24gKHBhcnQpIHtcbiAgICAgICAgICAgIGlmICghcGFydCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcnQgPSBwYXJ0LnNwbGl0KCcrJykuam9pbignICcpOyAvLyByZXBsYWNlIGV2ZXJ5ICsgd2l0aCBzcGFjZSwgcmVnZXhwLWZyZWUgdmVyc2lvblxuICAgICAgICAgICAgY29uc3QgZXEgPSBwYXJ0LmluZGV4T2YoJz0nKTtcbiAgICAgICAgICAgIGxldCBrZXkgPSBlcSA+IC0xID8gcGFydC5zdWJzdHIoMCwgZXEpIDogcGFydDtcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IGVxID4gLTEgPyBkZWNvZGVVUklDb21wb25lbnQocGFydC5zdWJzdHIoZXEgKyAxKSkgOiAnJztcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSBrZXkuaW5kZXhPZignWycpO1xuICAgICAgICAgICAgaWYgKGZyb20gPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbZGVjb2RlVVJJQ29tcG9uZW50KGtleSldID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG8gPSBrZXkuaW5kZXhPZignXScsIGZyb20pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gZGVjb2RlVVJJQ29tcG9uZW50KGtleS5zdWJzdHJpbmcoZnJvbSArIDEsIHRvKSk7XG4gICAgICAgICAgICAgICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KGtleS5zdWJzdHJpbmcoMCwgZnJvbSkpO1xuICAgICAgICAgICAgICAgIGlmICghcmVzdWx0W2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpbmRleCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XS5wdXNoKHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XVtpbmRleF0gPSB2YWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQwNTUyMzcyfFN0YWNrIE92ZXJmbG93fVxuICAgICAqIEBwYXJhbSBvYmpcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Rm9ybURhdGEob2JqKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnJlZHVjZSgoZm9ybURhdGEsIGtleSkgPT4ge1xuICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgb2JqW2tleV0pO1xuICAgICAgICAgICAgcmV0dXJuIGZvcm1EYXRhO1xuICAgICAgICB9LCBuZXcgRm9ybURhdGEoKSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUXVlcnk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFRleHQge1xuICAgIC8qKlxuICAgICAqIEBzZWUge0BsaW5rIGh0dHBzOi8vY2FwaXRhbGl6ZW15dGl0bGUuY29tLyNjYXBpdGFsaXphdGlvbnJ1bGVzfFRPRE8gamF6eiB0aGlzIG9uZSB1cH1cbiAgICAgKiBAcGFyYW0gdGV4dFxuICAgICAqIEBwYXJhbSBpZ25vcmVcbiAgICAgKi9cbiAgICBzdGF0aWMgdGl0bGVDYXNlKHRleHQsIGlnbm9yZSA9IFsnYScsICdhbmQnLCAnYXMnLCAnZm9yJywgJ29mJywgJ29yJywgJ3RoZScsICd0byddKSB7XG4gICAgICAgIGxldCBjYXBpdGFsaXplID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgaWdub3JlUGF0dGVybiA9IG5ldyBSZWdFeHAoYF4oJHtpZ25vcmUuam9pbignfCcpfSkoXFxcXFcrLiopKiRgLCAnaScpO1xuICAgICAgICB0ZXh0ID0gdGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICgvW2Etel0vaS50ZXN0KHRleHRbaV0pICYmIGNhcGl0YWxpemUpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCB8fCAhaWdub3JlUGF0dGVybi50ZXN0KHRleHQuc2xpY2UoaSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC5zbGljZSgwLCBpKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFtpXS50b1VwcGVyQ2FzZSgpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LnNsaWNlKGkgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FwaXRhbGl6ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FwaXRhbGl6ZSA9IC9cXFcvLnRlc3QodGV4dFtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuICAgIHN0YXRpYyBjYW1lbENhc2UodGV4dCwgbXVzdFN0YXJ0V2l0aEFscGhhID0gZmFsc2UsIHNwbGl0dGVyID0gL1teYS16MC05XSsvaSkge1xuICAgICAgICB0ZXh0ID0gdGV4dFxuICAgICAgICAgICAgLnNwbGl0KHNwbGl0dGVyKVxuICAgICAgICAgICAgLm1hcCh0b2tlbiA9PiB0b2tlbi5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArXG4gICAgICAgICAgICB0b2tlbi5zdWJzdHIoMSkudG9Mb3dlckNhc2UoKSlcbiAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICAgICAgaWYgKG11c3RTdGFydFdpdGhBbHBoYSkge1xuICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXlteYS16XSsvaSwgJycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZXh0LmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgdGV4dC5zdWJzdHIoMSk7XG4gICAgfVxuICAgIHN0YXRpYyB1bkNhbWVsQ2FzZSh0ZXh0KSB7XG4gICAgICAgIHJldHVybiB0ZXh0XG4gICAgICAgICAgICAucmVwbGFjZSgvKFteMC05IF0pKFswLTldKS9nLCAnJDEgJDInKVxuICAgICAgICAgICAgLnJlcGxhY2UoLyhbXkEtWiBdKShbQS1aXSkvZywgJyQxICQyJyk7XG4gICAgfVxuICAgIHN0YXRpYyBveGZvcmRDb21tYUxpc3QobGlzdCkge1xuICAgICAgICByZXR1cm4gbGlzdC5qb2luKCcsICcpLnJlcGxhY2UoLywgKFteLF0rKSQvLCBgJHtsaXN0Lmxlbmd0aCA+IDIgPyAnLCcgOiAnJ30gYW5kICQxYCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBzZWUgaHR0cHM6Ly93d3cucGhwLm5ldC9tYW51YWwvZW4vZnVuY3Rpb24uYm9vbHZhbC5waHBcbiAgICAgKi9cbiAgICBzdGF0aWMgc2NhbGFyVG9Cb29sKHZhbHVlKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSAhPSAwO1xuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZmFsc2UnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdubyc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJzAnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gISh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgaXNCb29sZWFuVmFsdWUodGV4dCkge1xuICAgICAgICBpZiAodHlwZW9mIHRleHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRleHQudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3RydWUnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2ZhbHNlJzpcbiAgICAgICAgICAgICAgICBjYXNlICd5ZXMnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ25vJzpcbiAgICAgICAgICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFRleHQ7XG5UZXh0LlBsYWNlaG9sZGVyU3RyaW5nID0gY2xhc3MgZXh0ZW5kcyBTdHJpbmcge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZywgLi4ucmVzdCkge1xuICAgICAgICBzdXBlciguLi5yZXN0KTtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICAgIH1cbiAgICBmaW5hbGl6ZSguLi5hcmdzKSB7XG4gICAgICAgIGxldCB0ZXh0ID0gdGhpcy52YWx1ZU9mKCk7XG4gICAgICAgIGZvciAoY29uc3QgcGxhY2Vob2xkZXIgb2YgT2JqZWN0LmtleXModGhpcy5fY29uZmlnKSkge1xuICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZShwbGFjZWhvbGRlciwgdGhpcy5fY29uZmlnWycnICsgcGxhY2Vob2xkZXJdKC4uLmFyZ3MpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=