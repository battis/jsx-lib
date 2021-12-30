"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.GetRequestParameters = exports.Query = exports.expirationToDate = exports.Cookie = exports.Browser = void 0;
const Browser_1 = __importDefault(require("./src/Browser"));
exports.Browser = Browser_1.default;
const Cookie_1 = __importStar(require("./src/Cookie"));
exports.Cookie = Cookie_1.default;
Object.defineProperty(exports, "expirationToDate", { enumerable: true, get: function () { return Cookie_1.expirationToDate; } });
const Query_1 = __importStar(require("./src/Query"));
exports.Query = Query_1.default;
Object.defineProperty(exports, "GetRequestParameters", { enumerable: true, get: function () { return Query_1.GetRequestParameters; } });
const Text_1 = __importDefault(require("./src/Text"));
exports.Text = Text_1.default;
