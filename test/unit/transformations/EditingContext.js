import { makeContext } from '../../makers';

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

		it('should not add null to summaries', () => {
			const context = makeContext('foo');
			context.change('bar');
			expect(context.summaries).to.be.empty;
		});
	});

	describe('strip/unstrip', () => {
		const input = 'foo <nowiki>hidden</nowiki>';

		it('should hide', () => {
			const context = makeContext(input);
			expect(context.text).to.contain('hidden');
			context.strip();
			expect(context.text).to.not.contain('hidden');
		});

		it('should restore text back', () => {
			const context = makeContext(input);
			context.strip();
			context.unstrip();
			expect(context.text).to.equal(input);
		});

		it('should restore modified text', () => {
			const context = makeContext(input);
			context.strip();
			context.change(context.text.replace('foo', 'bar'));
			context.unstrip();
			expect(context.text).to.equal('bar <nowiki>hidden</nowiki>');
		});
	});

	describe('finalize', () => {
		it('should not do anything if nothing changed', () => {
			const context = makeContext('foo bar');
			context.strip();
			context.finalize();
			expect(context.text).to.equal('foo bar');
		});

		it('should unstrip', () => {
			const context = makeContext('foo <!-- bar -->');
			context.strip();
			context.change(context.text.replace('foo', 'test'));
			context.finalize();
			expect(context.text).to.equal('test <!-- bar -->');
		});
	});

	describe('skip', () => {
		it('should not skip if not called', () => {
			const context = makeContext('foo');
			expect(context.skipInfo).to.be.false;
		});

		it('should return skip data', () => {
			const context = makeContext('foo');
			context.skip('foo', 'bar');
			expect(context.skipInfo).to.deep.equal({category:'foo', message: 'bar'});
		});
	});
});
