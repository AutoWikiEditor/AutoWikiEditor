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

/**
 * @param {Title} title
 * @param {int} ns
 * @param {string} prefixed
 * @param {string} text
 */
function expectTitle(title, ns, prefixed, text) {
	expect(title.namespace).to.equal(ns);
	expect(title.prefixedText).to.equal(prefixed);
	expect(title.text).to.equal(text);
}

describe('TitleParser', () => {
	describe('parse', () => {
		it('should work in mainspace', () => {
			expectTitle(makeParser().parse('Foobar'),
				Namespace.NS_MAIN,
				'Foobar',
				'Foobar'
			);
		});

		it('should work in namespaces', () => {
			expectTitle(makeParser().parse('User:Foo'),
				Namespace.NS_USER,
				'User:Foo',
				'Foo'
			);
		});

		it('should capitalize first letter where appropriate', () => {
			expectTitle(makeParser().parse('article'),
				Namespace.NS_MAIN,
				'Article',
				'Article'
			);

			expectTitle(makeParser().parse('Wikipedia:dramaboard'),
				Namespace.NS_PROJECT,
				'Wikipedia:Dramaboard',
				'Dramaboard'
			);
		});

		it('should preserve first letter case in appropriate namespaces', () => {
			expectTitle(makeParser().parse('Gadget definition:camelCase'),
				2302, // Gadget definition:
				'Gadget definition:camelCase',
				'camelCase'
			);
		});

		it('should normalize whitespace', () => {
			expectTitle(makeParser().parse('_ Foo     bar  _ '),
				Namespace.NS_MAIN,
				'Foo bar',
				'Foo bar'
			);
		});

		it('should decode URL-encoded titles', () => {
			expectTitle(makeParser().parse('Foo%20bar%3F'),
				Namespace.NS_MAIN,
				'Foo bar?',
				'Foo bar?'
			);

			expectTitle(makeParser().parse('Foo_bar'),
				Namespace.NS_MAIN,
				'Foo bar',
				'Foo bar'
			);
		});

		it('should clear hashes', () => {
			expectTitle(makeParser().parse('Foo bar#baz'),
				Namespace.NS_MAIN,
				'Foo bar',
				'Foo bar'
			);
		});

		it('should remove whitespace on namespace boundary', () => {
			expectTitle(makeParser().parse('User :  Foo'),
				Namespace.NS_USER,
				'User:Foo',
				'Foo'
			);
		});

		it('should preserve whitespace around : in general', () => {
			expectTitle(makeParser().parse('Life: the Manual'),
				Namespace.NS_MAIN,
				'Life: the Manual',
				'Life: the Manual'
			);

			expectTitle(makeParser().parse('Wikipedia: Episode II : Attack of the Randy'),
				Namespace.NS_PROJECT,
				'Wikipedia:Episode II : Attack of the Randy',
				'Episode II : Attack of the Randy'
			);
		});

		it('should handle leading :s', () => {
			expectTitle(makeParser().parse(':foo'),
				Namespace.NS_MAIN,
				'Foo',
				'Foo'
			);

			expectTitle(makeParser().parse(':Category:foo'),
				Namespace.NS_CATEGORY,
				'Category:Foo',
				'Foo'
			);
		});

		it('should return null on invalid input', () => {
			// But valid title chars aren't checked ATM as not really needed
			expect(makeParser().parse('#muhaha')).to.be.a('null');
			expect(makeParser().parse('')).to.be.a('null');
			expect(makeParser().parse(':')).to.be.a('null');
		});

		it('should throw on invalid namespace', () => {
			function iThrow() {
				makeParser().parse('foo', -666);
			}
			expect(iThrow).to.throw(Error);
		});

		it('should add presumed namespace', () => {
			expectTitle(makeParser().parse('Foo', Namespace.NS_USER),
				Namespace.NS_USER,
				'User:Foo',
				'Foo'
			);

			expectTitle(makeParser().parse('Foo', Namespace.NS_MAIN),
				Namespace.NS_MAIN,
				'Foo',
				'Foo'
			);
		});

		it('should override presumed namespace', () => {
			expectTitle(makeParser().parse(':Foo', Namespace.NS_USER),
				Namespace.NS_MAIN,
				'Foo',
				'Foo'
			);

			expectTitle(makeParser().parse('User:Foo', Namespace.NS_PROJECT),
				Namespace.NS_USER,
				'User:Foo',
				'Foo'
			);

			expectTitle(makeParser().parse('User:Foo', Namespace.NS_MAIN),
				Namespace.NS_USER,
				'User:Foo',
				'Foo'
			);
		});
	});

	describe('detectNamespace', () => {
		it('should return null if search fails', () => {
			expect(makeParser().detectNamespace('this should fail')).to.be.a('null');
			expect(makeParser().detectNamespace('')).to.be.a('null');
		});

		it('should find namespaces', () => {
			expect(makeParser().detectNamespace('Special').id).to.equal(Namespace.NS_SPECIAL);
			expect(makeParser().detectNamespace('File talk').id).to.equal(Namespace.NS_FILE_TALK);
		});

		it('should be case-insensitive', () => {
			expect(makeParser().detectNamespace('MEDIAWIKI TALK').id)
				.to.equal(Namespace.NS_MEDIAWIKI_TALK);
			expect(makeParser().detectNamespace('template').id).to.equal(Namespace.NS_TEMPLATE);
			expect(makeParser().detectNamespace('cAtEgOrY').id).to.equal(Namespace.NS_CATEGORY);
		});

		it('should handle aliases and canonical names', () => {
			expect(makeParser().detectNamespace('WP').id).to.equal(Namespace.NS_PROJECT);
			expect(makeParser().detectNamespace('Image').id).to.equal(Namespace.NS_FILE);
		});
	});

	describe('removeHash', () => {
		it("shouldn't change input without hashes", () => {
			expect(makeParser().removeHash('fOo')).to.equal('fOo');
			expect(makeParser().removeHash('https://example.com')).to.equal('https://example.com');
		});

		it('should remove hashes', () => {
			expect(makeParser().removeHash('foo#bar')).to.equal('foo');
			expect(makeParser().removeHash('http://foo.com/bar#baz')).to.equal('http://foo.com/bar');
		});

		it('should handle multiple hashes', () => {
			expect(makeParser().removeHash('foo#bar#baz')).to.equal('foo');
			expect(makeParser().removeHash('foo##bar')).to.equal('foo');
		});

		it('should handle internal links', () => {
			expect(makeParser().removeHash('#foo')).to.equal('');
		});

		it('should handle garbage', () => {
			expect(makeParser().removeHash('')).to.equal('');
			expect(makeParser().removeHash('####')).to.equal('');
		});
	});
});
