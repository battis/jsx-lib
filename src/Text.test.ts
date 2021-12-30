import Text from './Text';
import Fixture from './Text.fixture';

describe('Text', () => {
    test('titleCase(string)', () => {
        expect(Text.titleCase(Fixture.lowerCase)).toBe(Fixture.titleCase);
        expect(Text.titleCase(Fixture.UPPERCASE)).toBe(Fixture.titleCase);
        expect(Text.titleCase(Fixture.mixedCASEbyWORD)).toBe(Fixture.titleCase);
        expect(Text.titleCase(Fixture.miXedCAsERAndOm)).toBe(Fixture.titleCase);
        expect(Text.titleCase('the')).toBe('The');
        expect(Text.titleCase(' the the')).toBe(' the the');
    });
    test('camelCase(string)', () => {
        expect(Text.camelCase(Fixture.lowerCase)).toBe(Fixture.camelCase);
        expect(Text.camelCase(Fixture.UPPERCASE)).toBe(Fixture.camelCase);
        expect(Text.camelCase(Fixture.mixedCASEbyWORD)).toBe(Fixture.camelCase);
        expect(Text.camelCase(Fixture.miXedCAsERAndOm)).toBe(Fixture.camelCase);
        expect(Text.camelCase('   foo bar')).toBe('fooBar');
        expect(Text.camelCase('0123 foo bar')).toBe('0123FooBar');
        expect(Text.camelCase('0123 foo bar', true)).toBe('fooBar');
    });
    test('unCamelCase(string)', () => {
        expect(Text.unCamelCase('fooBarBaz')).toBe('foo Bar Baz');
        expect(Text.unCamelCase('fooBar0123Baz')).toBe('foo Bar 0123 Baz');
        expect(Text.unCamelCase('fooBarBaz  Foo Bar Baz')).toBe(
            'foo Bar Baz  Foo Bar Baz'
        );
    });
});
