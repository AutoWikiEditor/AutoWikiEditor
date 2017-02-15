export default class UserInfo {
	_data;
	_tokens;

	constructor(dataFromApi, tokens = {}) {
		this._data = dataFromApi;
		this._tokens = tokens;
	}

	get isAnon() {
		return this._data.anon || false;
	}

	get name() {
		return this._data.name;
	}

	get groups() {
		return this._data.groups;
	}

	isInGroup(groupName) {
		return this.groups.indexOf(groupName) >= 0;
	}

	get hasMessages() {
		return this._data.messages || false;
	}

	get isBlocked() {
		return typeof this._data.blockid !== 'undefined';
	}

	getToken(type) {
		return this._tokens[type + 'token'] || null;
	}
}
