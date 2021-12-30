import { Optional } from '@battis/typescript-tricks';

export type Expiration = {
    expires_in: number;
    unit: 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds';
};

export function expirationToDate(expiration) {
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
                expiration = new Date(
                    Date.now() + expiration.expires_in * multiplier
                );
            }
    }
    return expiration;
}

export type CookieParams = {
    name: string;
    value: string;
    path?: Optional<string>;
    domain?: Optional<string>;
    maxAgeInSeconds?: Optional<number>;
    expires?: Optional<Expiration | Date | number>;
    secure?: Optional<boolean>;
    samesite?: Optional<boolean>;
};

function escapeSemicolon(raw) {
    return raw.replace(/;/g, ';');
}

export default class Cookie {
    static set({ name, value, path = '/', ...params }: CookieParams) {
        let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
            value
        )}; path=${escapeSemicolon(path)}`;
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
                    params[param] = expirationToDate(
                        params[param]
                    ).toUTCString();
                default:
                    cookie += `; ${param}=${escapeSemicolon(params[param])}`;
            }
        }
        document.cookie = cookie;
    }

    static get(name) {
        const matches = document.cookie.match(
            new RegExp(`(?:^|; )${encodeURIComponent(name)}=([^;]*)`)
        );
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    static delete(name) {
        this.set({ name, value: '', maxAgeInSeconds: -1 });
    }
}
