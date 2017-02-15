import { Namespace, Site } from '../../src/lib';
const query = require('./data/siteinfo.json').query;

/* global describe, it, expect */

function makeSite() {
	// Deep clone
	const cloned = JSON.parse(JSON.stringify(query));
	return new Site('https://en.wikipedia.org/w/', cloned);
}

describe('Site', () => {
	describe('url', () => {
		it('should work', () => {
			let site = makeSite();
			expect(site.url).to.equal('https://en.wikipedia.org/w/');
		});
	});

	describe('host', () => {
		it('should work', () => {
			let site = makeSite();
			expect( site.host ).to.equal( 'en.wikipedia.org' );
		});
	});

	describe('namespaces', () => {
		it('should have aliases, if any', () => {
			let site = makeSite();
			expect(site.namespaces[Namespace.NS_MAIN].aliases).to.be.an('undefined');
			expect(site.namespaces[Namespace.NS_PROJECT_TALK].aliases).to.deep.equal(['WT']);
		});

		it('should have regexes outside of mainspace', () => {
			let site = makeSite();
			expect(site.namespaces[Namespace.NS_MAIN].regex).to.be.a('null');
			expect(site.namespaces[Namespace.NS_TALK].regex).to.equal('(Talk)');
			expect(site.namespaces[Namespace.NS_PROJECT].regex).to.equal('(Wikipedia|Project|WP)');
		});
	});

	describe('getNamespace', () => {
		let site = makeSite();
		it('should return namespaces', () => {
			expect(site.getNamespace(Namespace.NS_PROJECT).name).to.equal('Wikipedia');
			expect(site.getNamespace(Namespace.NS_FILE_TALK).name).to.equal('File talk');
		});

		it('should return undefined if not found', () => {
			expect(site.getNamespace(12345)).to.be.an('undefined');
		});
	});
});
