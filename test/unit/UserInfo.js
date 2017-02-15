import UserInfo from '../../src/lib/UserInfo';

/* global describe, it, expect */

describe('UserInfo', () => {
	const anon = new UserInfo({
		id: 0,
		name: '127.0.0.1',
		anon: true,
		groups: ['*']
	});
	const loggedIn = new UserInfo({
		id: 123,
		name: 'Someuser',
		groups: ['*', 'user', 'autoconfirmed']
	});
	const allInclusive = new UserInfo(
		{
			id: 456,
			name: 'Someuser 2',
			groups: [ '*', 'user', 'autoconfirmed', 'sysop' ],
			messages: true,
			blockid: 12345,
			blockedby: 'Fate'
		},
		{
			'csrftoken': 'zomgtoken!',
			'footoken': 'thou shalt not pass'
		}
	);


	describe('isAnon', () => {
		it('should return true for anons', () => {
			expect(anon.isAnon).to.equal(true);
		});

		it('should return false when logged in', () => {
			expect(loggedIn.isAnon).to.equal(false);
			expect(allInclusive.isAnon).to.equal(false);
		});
	});

	describe('name', () => {
		it('should return username', () => {
			expect(anon.name).to.equal('127.0.0.1');
			expect(loggedIn.name).to.equal('Someuser');
			expect(allInclusive.name).to.equal('Someuser 2');
		});
	});

	describe('groups', () => {
		it('should return user groups', () => {
			expect(anon.groups).to.deep.equal(['*']);
			expect(loggedIn.groups).to.deep.equal(['*', 'user', 'autoconfirmed']);
			expect(allInclusive.groups).to.deep.equal(['*', 'user', 'autoconfirmed', 'sysop']);
		});
	});

	describe('isInGroup', () => {
		it('should report existing group', () => {
			expect(anon.isInGroup('*')).to.equal(true);
			expect(loggedIn.isInGroup('user')).to.equal(true);
		});

		it('should report missing group', () => {
			expect(anon.isInGroup('user')).to.equal(false);
			expect(loggedIn.isInGroup('whatever')).to.equal(false);
		});
	});

	describe('hasMessage', () => {
		it('should work', () => {
			expect(anon.hasMessages).to.equal(false);
			expect(allInclusive.hasMessages).to.equal(true);
		});
	});
});
