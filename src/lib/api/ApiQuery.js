import Api from './Api';
import _ from 'underscore';

export default class ApiQuery extends Api {
	submodules;

	constructor(url, submodules) {
		super(url);
		this.submodules = submodules;
	}

	prepareRequest() {
		let params = super.prepareRequest();
		params.action = 'query';

		return _.extend(params, this.submodules);
	}
}
