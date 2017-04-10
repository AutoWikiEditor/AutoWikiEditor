import ReplacementRule from '../../../src/lib/transformations/ReplacementRule';

/* global describe, it, expect */

describe('ReplacementRule', () => {
	describe('regex', () => {
		it('should return a RegExp', () => {
			let rule = new ReplacementRule('foo', 'bar', 0);
			expect(rule.regex).to.be.a('RegExp');
			rule = new ReplacementRule('foo', 'bar', ReplacementRule.IsRegex);
			expect(rule.regex).to.be.a('RegExp');
		});
	});

	it('test replacements', () => {
		const tests = [
			//[ text, expected, find, replace, flags
			[ 'foo boo GOO', 'f00 b00 GOO', 'oo', '00', 0 ],
			[ 'foo', 'foo', 'o+', '0', 0 ],
			[ 'foo', 'f0', 'o+', '0', ReplacementRule.IsRegex ],
			[ 'foo boo GOO', 'f00 b00 G00', 'oo', '00', ReplacementRule.CaseInsensitive ],
			[ 'foo boo\ngoo', 'foo b0\ng0', 'o+$', '0', ReplacementRule.Multiline + ReplacementRule.IsRegex ]
		];

		tests.forEach(test => {
			const rr = new ReplacementRule( test[2], test[3], test[4] );
			expect(rr.apply(test[0], [])).to.equal(test[1]);
		});
	});
});
