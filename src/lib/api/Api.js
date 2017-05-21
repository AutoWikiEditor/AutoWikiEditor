import _ from 'underscore';

/* global fetch */

export default class Api {
	url;

	/**
	 *
	 * @param {String} url
	 * @constructor
	 */
	constructor(url) {
		this.url = url;
	}

	prepareRequest() {
		return {};
	}

	needsPost() {
		return false;
	}

	request(extraParams = {}) {
		let params = this.prepareRequest();
		params.format = 'json';
		params.formatversion = 2;
		params.origin = '*';
		params = _.extend(params, extraParams);

		const requestMethod = this.needsPost()
			? 'POST'
			: 'GET';
		let url = this.url + 'api.php';

		if (requestMethod === 'GET') {
			url = url + '?' + _.map(
				params,
				(value, key) => key + '=' + encodeURIComponent(value)
			).join('&');
		}

		let options = {
			method: requestMethod,
			mode: 'cors'
		};

		return fetch(url, options)
			.then(request => request.json());
	}
}
