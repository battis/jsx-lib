export default class Fixture {
    static search =
        "?foo=bar&baz=a%20longer%20string%20that's%20been%20encoded%20%26%20has%20_punctuation_";
    static formData = {
        foo: 'bar',
        baz: "a longer string that's been encoded & has _punctuation_"
        /*
         * FIXME currently not well-handled cases include:
         *  - number values
         *  - object/function values
         *  - array values
         *  (Really, strings are what is well-handled, because that's what is easy)
         */
    };
    static verifyFormData(d) {
        expect(d).toBeInstanceOf(FormData);
        expect(d.get('foo')).toBe('bar');
        expect(d.get('baz')).toBe(
            "a longer string that's been encoded & has _punctuation_"
        );
    }
}
