"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = Query;
