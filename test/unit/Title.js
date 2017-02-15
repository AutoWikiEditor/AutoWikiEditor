import Title from '../../src/lib/Title';

/* global describe, it, expect */

describe('Title', () => {
	describe('namespace', () => {
		it('should return correct namespace', () => {
			let t = new Title(123, 'Foobar');
			expect(t.namespace).to.equal(123);
		});
	});

	describe('prefixedText', () => {
		it('should return namespace', () => {
			let t = new Title(2, 'User:Foo');
			expect(t.prefixedText).to.equal('User:Foo');
			t = new Title(2, 'User:Foo', 'Foo');
			expect(t.prefixedText).to.equal('User:Foo');
		});

		it('should work in mainspace', () => {
			let t = new Title(0, 'Not namespace:Foo');
			expect(t.prefixedText).to.equal('Not namespace:Foo');
			t = new Title(0, 'Not namespace:Foo', 'Not namespace:Foo');
			expect(t.prefixedText).to.equal('Not namespace:Foo');
			t = new Title(0, 'Foo', 'Foo');
			expect(t.prefixedText).to.equal('Foo');
		});
	});

	describe('text', () => {
		it('should work with known text', () => {
			let t = new Title(123, 'Namespace:Foo', 'Foo');
			expect(t.text).to.equal('Foo');
			t = new Title(123, 'Namespace:Foo:Bar', 'Foo:Bar');
			expect(t.text).to.equal('Foo:Bar');
		});

		it('should deduce its value otherwise', () => {
			let t = new Title(123, 'Namespace:Foo');
			expect(t.text).to.equal('Foo');
			t = new Title(123, 'Namespace:Foo:Bar');
			expect(t.text).to.equal('Foo:Bar');
		});

		it('should work in mainspace', () => {
			let t = new Title(0, 'Foo');
			expect(t.text).to.equal('Foo');
			t = new Title(0, 'Not namespace:Foo');
			expect(t.text).to.equal('Not namespace:Foo');
			t = new Title(0, 'Not namespace:Foo', 'Not namespace:Foo');
			expect(t.text).to.equal('Not namespace:Foo');
		});
	});

	describe('wikiEscaped', () => {
		it('should escape stuff', () => {
			let t = new Title(0, 'Foo bar?');
			expect(t.wikiEscaped).to.equal('Foo_bar%3F');
		});

		it('should include namespace', () => {
			let t = new Title(123, 'Name space:Foo bar');
			expect(t.wikiEscaped).to.equal('Name_space:Foo_bar');
			t = new Title(123, 'Name space:Foo_bar:baz');
			expect(t.wikiEscaped).to.equal('Name_space:Foo_bar:baz');
		});

		it('should not escape slashes', () => {
			let t = new Title(0, 'Foo/bar/baz');
			expect(t.wikiEscaped).to.equal('Foo/bar/baz');
		});
	});
});
