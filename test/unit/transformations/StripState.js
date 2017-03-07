import StripState from '../../../src/lib/transformations/StripState';

/* global describe, it, expect */

describe('StripState', () => {
	describe('strip/unstrip', () => {
		let ss = new StripState();

		const initialText = '⌞⌞⌞123456⌟⌟⌟<!--hide this\n--> not this <nowiki>\n but this too </nowiki><!-- and this -->';
		const stripped = ss.strip(initialText);

		it('should remove token-looking stuff, <nowiki> and comments', () => {
			expect(stripped).to.not.contain('hide this');
			expect(stripped).to.not.contain('but this too');
			expect(stripped).to.not.contain('and this');
			expect(stripped).to.contain('not this');
		});

		it('should restore previous state',  () => {
			const text = ss.unstrip(stripped);
			expect(text).to.equal(initialText);
		});

		it('should unstrip after modifications', () => {
			const text = stripped.replace('⌞⌞⌞0⌟⌟⌟', '')
				.replace('not this', 'modified');

			expect(ss.unstrip(text)).to
				.equal('<!--hide this\n--> modified <nowiki>\n but this too </nowiki><!-- and this -->');
		});
	});
});
