type PlaceholderCallback = (...args: any) => string;
type PlaceHolderStringConfig = { [key: string]: PlaceholderCallback };

export default class Text {
    /**
     * @see {@link https://capitalizemytitle.com/#capitalizationrules|TODO jazz this one up}
     * @param text
     * @param ignore
     */
    static titleCase(
        text: string,
        ignore = ['a', 'and', 'as', 'for', 'of', 'or', 'the', 'to']
    ): string {
        let capitalize = true;
        const ignorePattern = new RegExp(
            `^(${ignore.join('|')})(\\W+.*)*$`,
            'i'
        );
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
            } else {
                capitalize = /\W/.test(text[i]);
            }
        }
        return text;
    }

    static camelCase(
        text: string,
        mustStartWithAlpha = false,
        splitter = /[^a-z0-9]+/i
    ): string {
        text = text
            .split(splitter)
            .map(
                token =>
                    token.charAt(0).toUpperCase() +
                    token.substr(1).toLowerCase()
            )
            .join('');
        if (mustStartWithAlpha) {
            text = text.replace(/^[^a-z]+/i, '');
        }
        return text.charAt(0).toLowerCase() + text.substr(1);
    }

    static unCamelCase(text: string): string {
        return text
            .replace(/([^0-9 ])([0-9])/g, '$1 $2')
            .replace(/([^A-Z ])([A-Z])/g, '$1 $2');
    }

    static oxfordCommaList(list: string[]): string {
        return list.join(', ').replace(/, ([^,]+)$/, `${list.length > 2 ? ',' : ''} and $1`);
    }

    /**
     * @see https://www.php.net/manual/en/function.boolval.php
     */
    static scalarToBool(value): boolean {
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

    static PlaceholderString = class extends String {
        _config: PlaceHolderStringConfig;

        constructor(config: PlaceHolderStringConfig, ...rest) {
            super(...rest);
            this._config = config;
        }

        public finalize(...args) {
            let text = this.valueOf();
            for (const placeholder of Object.keys(this._config)) {
                text = text.replace(
                    placeholder,
                    this._config['' + placeholder](...args)
                );
            }
            return text;
        }
    };
}
