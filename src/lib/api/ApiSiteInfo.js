import ApiQuery from './ApiQuery';
import ApiError from '../exceptions/ApiError';
import Site from '../Site';

export default class ApiSiteInfo extends ApiQuery {
	constructor(url) {
		super(url, {
			meta: 'siteinfo',
			siprop: 'general|namespaces|namespacealiases'
		});
	}

	load() {
		this.request()
			.then(data => {
				if (!data.query
					|| !data.query.general
					|| !data.query.namespaces
					|| !data.query.namespacealiases
				) {
					throw new ApiError();
				}

				return new Site(this.url,
					{
						general: data.query.general,
						namespaces: data.query.namespaces,
						namespacealiases: data.query.namespacealiases
					}
				);
			});
	}
}
