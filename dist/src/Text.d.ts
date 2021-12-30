declare type PlaceholderCallback = (...args: any) => string;
declare type PlaceHolderStringConfig = {
    [key: string]: PlaceholderCallback;
};
export default class Text {
    /**
     * @see {@link https://capitalizemytitle.com/#capitalizationrules|TODO jazz this one up}
     * @param text
     * @param ignore
     */
    static titleCase(text: string, ignore?: string[]): string;
    static camelCase(text: string, mustStartWithAlpha?: boolean, splitter?: RegExp): string;
    static unCamelCase(text: string): string;
    static oxfordCommaList(list: string[]): string;
    /**
     * @see https://www.php.net/manual/en/function.boolval.php
     */
    static scalarToBool(value: any): boolean;
    static isBooleanValue(text: any): boolean;
    static PlaceholderString: {
        new (config: PlaceHolderStringConfig, ...rest: any[]): {
            readonly [index: number]: string;
            _config: PlaceHolderStringConfig;
            finalize(...args: any[]): string;
            toString(): string;
            charAt(pos: number): string;
            charCodeAt(index: number): number;
            concat(...strings: string[]): string;
            indexOf(searchString: string, position?: number | undefined): number;
            lastIndexOf(searchString: string, position?: number | undefined): number;
            localeCompare(that: string): number;
            localeCompare(that: string, locales?: string | string[] | undefined, options?: Intl.CollatorOptions | undefined): number;
            match(regexp: string | RegExp): RegExpMatchArray | null;
            match(matcher: {
                [Symbol.match](string: string): RegExpMatchArray | null;
            }): RegExpMatchArray | null;
            replace(searchValue: string | RegExp, replaceValue: string): string;
            replace(searchValue: string | RegExp, replacer: (substring: string, ...args: any[]) => string): string;
            replace(searchValue: {
                [Symbol.replace](string: string, replaceValue: string): string;
            }, replaceValue: string): string;
            replace(searchValue: {
                [Symbol.replace](string: string, replacer: (substring: string, ...args: any[]) => string): string;
            }, replacer: (substring: string, ...args: any[]) => string): string;
            search(regexp: string | RegExp): number;
            search(searcher: {
                [Symbol.search](string: string): number;
            }): number;
            slice(start?: number | undefined, end?: number | undefined): string;
            split(separator: string | RegExp, limit?: number | undefined): string[];
            split(splitter: {
                [Symbol.split](string: string, limit?: number | undefined): string[];
            }, limit?: number | undefined): string[];
            substring(start: number, end?: number | undefined): string;
            toLowerCase(): string;
            toLocaleLowerCase(locales?: string | string[] | undefined): string;
            toUpperCase(): string;
            toLocaleUpperCase(locales?: string | string[] | undefined): string;
            trim(): string;
            readonly length: number;
            substr(from: number, length?: number | undefined): string;
            valueOf(): string;
            codePointAt(pos: number): number | undefined;
            includes(searchString: string, position?: number | undefined): boolean;
            endsWith(searchString: string, endPosition?: number | undefined): boolean;
            normalize(form: "NFC" | "NFD" | "NFKC" | "NFKD"): string;
            normalize(form?: string | undefined): string;
            repeat(count: number): string;
            startsWith(searchString: string, position?: number | undefined): boolean;
            anchor(name: string): string;
            big(): string;
            blink(): string;
            bold(): string;
            fixed(): string;
            fontcolor(color: string): string;
            fontsize(size: number): string;
            fontsize(size: string): string;
            italics(): string;
            link(url: string): string;
            small(): string;
            strike(): string;
            sub(): string;
            sup(): string;
            padStart(maxLength: number, fillString?: string | undefined): string;
            padEnd(maxLength: number, fillString?: string | undefined): string;
            trimEnd(): string;
            trimStart(): string;
            trimLeft(): string;
            trimRight(): string;
            matchAll(regexp: RegExp): IterableIterator<RegExpMatchArray>;
            [Symbol.iterator](): IterableIterator<string>;
            at(index: number): string | undefined;
        };
        fromCharCode(...codes: number[]): string;
        fromCodePoint(...codePoints: number[]): string;
        raw(template: {
            raw: readonly string[] | ArrayLike<string>;
        }, ...substitutions: any[]): string;
    };
}
export {};
