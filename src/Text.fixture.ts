export default class Fixture {
    static lowerCase =
        'the sample text needs to test small words like a, and, of, for, and the, as well as punctuation like *, &, (commas), @ and maybe even some emoji like 🤸 or 👍🏿 as well as 12 or 123 numbers, some like $13.1425';

    static titleCase =
        'The Sample Text Needs to Test Small Words Like a, and, of, for, and the, as Well as Punctuation Like *, &, (Commas), @ and Maybe Even Some Emoji Like 🤸 or 👍🏿 as Well as 12 or 123 Numbers, Some Like $13.1425';

    static camelCase =
        'theSampleTextNeedsToTestSmallWordsLikeAAndOfForAndTheAsWellAsPunctuationLikeCommasAndMaybeEvenSomeEmojiLikeOrAsWellAs12Or123NumbersSomeLike131425';

    static UPPERCASE = Fixture.lowerCase.toUpperCase();

    static get mixedCASEbyWORD() {
        const l = this.lowerCase.split(' ');
        const u = this.UPPERCASE.split(' ');
        const m: string[] = [];
        for (let i = 0; i < l.length; i++) {
            if (i % 2 == 0) {
                m.push(l[i]);
            } else {
                m.push(u[i]);
            }
        }
        return m.join(' ');
    }

    static get miXedCAsERAndOm() {
        let m = '';
        let lower = Math.random() > 0.5;

        const step = () => {
            return Math.floor((Math.random() * this.lowerCase.length) / 10);
        };

        for (let i = step(); i < this.lowerCase.length; i += step()) {
            if (lower) {
                m += this.lowerCase.substr(m.length, i);
            } else {
                m += this.UPPERCASE.substr(m.length, i);
            }
            lower = !lower;
        }
        return m;
    }
}
