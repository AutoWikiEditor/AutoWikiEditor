import Namespace from '../../src/lib/Namespace';
import { makeSite } from '../makers';

/* global describe, it, expect */

describe('Site', () => {
	describe('url', () => {
		it('should work', () => {
			expect(makeSite().url).to.equal('https://en.wikipedia.org/w/');
		});
	});

	describe('host', () => {
		it('should work', () => {
			expect(makeSite().host).to.equal( 'en.wikipedia.org' );
		});
	});

	describe('namespaces', () => {
		it('should have aliases, if any', () => {
			const site = makeSite();
			expect(site.namespaces[Namespace.NS_MAIN].aliases).to.be.an('undefined');
			expect(site.namespaces[Namespace.NS_PROJECT_TALK].aliases).to.deep.equal(['WT']);
		});

		it('should have regexes outside of mainspace', () => {
			const site = makeSite();
			expect(site.namespaces[Namespace.NS_MAIN].regex).to.be.a('null');
			expect(site.namespaces[Namespace.NS_TALK].regex).to.equal('(Talk)');
			expect(site.namespaces[Namespace.NS_PROJECT].regex).to.equal('(Wikipedia|Project|WP)');
		});
	});

	describe('case', () => {
		it('should return case', () => {
			expect(makeSite().case).to.equal('first-letter');
		});
	});

	describe('getNamespace', () => {
		it('should return namespaces', () => {
			const site = makeSite();
			expect(site.getNamespace(Namespace.NS_PROJECT).name).to.equal('Wikipedia');
			expect(site.getNamespace(Namespace.NS_FILE_TALK).name).to.equal('File talk');
		});

		it('should return undefined if not found', () => {
			expect(makeSite().getNamespace(12345)).to.be.an('undefined');
		});
	});
});
