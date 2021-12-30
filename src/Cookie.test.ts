import Cookie from './Cookie';
import Fixture from './Cookie.fixture';
import Identifier from '@battis/identifier';

describe('Cookie', () => {
    beforeEach(() => {
        document.cookie
            .split(';')
            .reduce((cookies: string[], raw) => {
                const match = raw.match(/^\s*([^=]+)=?(.+)?$/) || [];
                const [ignore, key = undefined] = match;
                if (
                    key &&
                    !key.match(
                        /^(path|domain|max-age|expires|secure|samesite)$/
                    )
                ) {
                    cookies.push(key);
                }
                return cookies;
            }, [])
            .forEach((cookie) => {
                document.cookie = `${cookie}=;max-age=-1`;
            });
        expect(document.cookie).toBe('');
    });

    test('set()', () => {
        for (const c in Fixture.cookies) {
            Cookie.set(Fixture.cookies[c]);
            // observationally, document.cookie's setter is not instantaneous and a small delay exists
            setTimeout(() => {
                const index = document.cookie.indexOf(c);
                expect(index).toBeGreaterThanOrEqual(0);
                expect(document.cookie.substr(index, c.length)).toBe(c);
            });
        }

        const name = Identifier.identifier();
        const value = Identifier.identifier();
        Cookie.set({ name, value, path: '/foo/bar' });
        expect(document.cookie.indexOf(`${name}=${value}`)).toBe(-1);

        Cookie.set({ name, value, domain: Identifier.identifier() + '.com' });
        expect(document.cookie.indexOf(`${name}=${value}`)).toBe(-1);
    });

    test('get()', () => {
        for (const c in Fixture.cookies) {
            document.cookie = c;
            expect(Cookie.get(Fixture.cookies[c].name)).toBe(
                Fixture.cookies[c].value
            );
        }
    });

    test('delete()', () => {
        for (const c in Fixture.cookies) {
            document.cookie = c;
            expect(document.cookie.indexOf(c)).toBeGreaterThanOrEqual(0);
            Cookie.delete(Fixture.cookies[c].name);
            expect(document.cookie.indexOf(c)).toBe(-1);
        }
    });
});
