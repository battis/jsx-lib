import Identifier from '@battis/identifier';

export default class Fixture {
    private static _cookies;

    static get cookies() {
        if (!this._cookies) {
            this._cookies = [];
            const encodeable = ';,/?:@&=+$# ';
            const params = {};
            const concat = (params) => {
                const randomEncodable = () => {
                    return encodeable.charAt(Math.random() * encodeable.length);
                };

                params.name = Identifier.identifier(5) + randomEncodable() + Identifier.identifier(4);
                params.value =
                    Identifier.identifier(5) + randomEncodable() + Identifier.identifier(5);
                const { name, value, ...options } = params;
                this._cookies[
                    encodeURIComponent(name) + '=' + encodeURIComponent(value)
                ] = { ...params };
            };

            concat(params);

            params['expires'] = Date.now() + 600;

            params['expires'] = new Date(params['expires']);
            concat(params);

            params['expires'] = { expires_in: 1, unit: 'hours' };
            concat(params);

            params['maxAgeInSeconds'] = 600;
            concat(params);

            delete params['expires'];
            concat(params);

            delete params['maxAgeInSeconds'];
            params['secure'] = true;
            concat(params);

            params['samesite'] = true;
            concat(params);

            delete params['secure'];
            concat(params);
        }
        return this._cookies;
    }
}
