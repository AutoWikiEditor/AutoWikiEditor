import EditingContext from '../../../src/lib/transformations/EditingContext';
import TitleParser from '../../../src/lib/TitleParser';
import { makeSite } from '../../makers';

/**
 * @param {string} text
 * @param {string} titleText
 * @return {EditingContext}
 */
function makeContext( text, titleText = 'Some title' ) {
	const site = makeSite();
	const title = new TitleParser( site ).parse( titleText );
	return new EditingContext( site, title, text );
}


/* global describe, it, expect */

describe('EditingContext', () => {
	describe('change', () => {
		it('should alter text', () => {
			const context = makeContext('foo bar baz');
			context.change('muhaha', 'rvv');
			expect(context.text).to.equal('muhaha');
			expect(context.summaries).to.deep.equal(['rvv']);
			expect(context.hasChanges).to.equal(true);
		});

		it('should be a no-op on no change', () => {
			const context = makeContext('test');
			context.change('test', 'no change');
			expect(context.hasChanges).to.equal(false);
			expect(context.summaries).to.be.empty;
		});
	});
});
