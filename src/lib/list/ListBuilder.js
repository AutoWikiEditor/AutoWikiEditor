import { ApiQuery } from '../api';
import { Title } from '../';
import _ from 'underscore';

export default class ListBuilder {
	constructor() {

	}

	makeList() {
		let params = this.getQueryParameters();

		const api = new ApiQuery('https://en.wikipedia.org/w/');

		return api.request(params).then(data => {
			return new Promise((resolve, reject) => {
				if (!data.query || !_.isArray(data.query[this.apiPath])) {
					reject('API error or whatever');
				}

				let list = [];

				data.query[this.apiPath].forEach(obj => {
					list.push(new Title(obj.ns, obj.title))
				});

				resolve(list);
			});
		});
	}

	get name() {
		throw new Error('Not implemented');
	}

	get apiPath() {
		throw new Error('Not implemented');
	}

	getOptionsForm() {
		throw new Error('Not implemented');
	}

	getQueryParameters() {
		throw new Error('Not implemented');
	}
}
