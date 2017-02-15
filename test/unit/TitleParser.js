import { Namespace, Site, Title, TitleParser } from '../../src/lib';
const query = require('./data/siteinfo.json').query;

/* global describe, it, expect */

/**
 * @return {TitleParser}
 */
function makeParser() {
	const clone = JSON.parse(JSON.stringify(query));
	const site = new Site('https://en.wikipedia.org/w/', clone);
	return new TitleParser(site);
}

describe('TitleParser', () => {
	describe('detectNamespace', () => {
		let parser = makeParser();

		it('should return null if search fails', () => {
			expect(parser.detectNamespace('this should fail')).to.be.a('null');
			expect(parser.detectNamespace('')).to.be.a('null');
		});

		it('should find namespaces', () => {
			expect(parser.detectNamespace('Special').id).to.equal(Namespace.NS_SPECIAL);
			expect(parser.detectNamespace('File talk').id).to.equal(Namespace.NS_FILE_TALK);
		});

		it('should be case-insensitive', () => {
			expect(parser.detectNamespace('MEDIAWIKI TALK').id)
				.to.equal(Namespace.NS_MEDIAWIKI_TALK);
			expect(parser.detectNamespace('template').id).to.equal(Namespace.NS_TEMPLATE);
			expect(parser.detectNamespace('cAtEgOrY').id).to.equal(Namespace.NS_CATEGORY);
		});

		it('should handle aliases and canonical names', () => {
			expect(parser.detectNamespace('WP').id).to.equal(Namespace.NS_PROJECT);
			expect(parser.detectNamespace('Image').id).to.equal(Namespace.NS_FILE);
		});
	});
});
