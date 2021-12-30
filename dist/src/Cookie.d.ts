import { Optional } from '@battis/typescript-tricks';
export declare type Expiration = {
    expires_in: number;
    unit: 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds';
};
export declare function expirationToDate(expiration: any): any;
export declare type CookieParams = {
    name: string;
    value: string;
    path?: Optional<string>;
    domain?: Optional<string>;
    maxAgeInSeconds?: Optional<number>;
    expires?: Optional<Expiration | Date | number>;
    secure?: Optional<boolean>;
    samesite?: Optional<boolean>;
};
export default class Cookie {
    static set({ name, value, path, ...params }: CookieParams): void;
    static get(name: any): string | undefined;
    static delete(name: any): void;
}
