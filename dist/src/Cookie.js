"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = Cookie;
