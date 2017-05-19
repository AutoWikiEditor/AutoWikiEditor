import ApiQuery from './ApiQuery';
import { Title, PageInfo } from '../';
import ApiError from '../exceptions/ApiError';
import PageMissingError from '../exceptions/PageMissingError';
import _ from 'underscore';

export default class ApiOpenForEditing extends ApiQuery {
	/** @var {Title} */
	title;

	/**
	 * @param {string} url
	 */
	constructor(url) {

		super(url,
			{
				prop: 'revisions',
				rvprop: 'ids|timestamp|flags|comment|user|contentmodel|content',
				rvlimit: 1
			}
		);
	}

	prepareRequest() {
		if (!this.title) {
			throw new Error('ApiOpenForEditing is trying to make a request without a title!');
		}
		return _.extend(super.prepareRequest(), { titles: this.title.prefixedText } );
	}

	/**
	 *
	 * @param {Title} title
	 * @returns {Promise<PageInfo>}
	 */
	open(title) {
		if (!(title instanceof Title)) {
			throw new Error('ApiOpenForEditing expected a title, got ' + typeof title);
		}
		this.title = title;

		return this.request()
			.then(data => {
				if (!data.query || !data.query.pages || data.query.pages.length !== 1) {
					throw new ApiError();
				}

				const page = data.query.pages[0];
				if (page.missing) {
					throw new PageMissingError();
				}

				const pageTitle = new Title(page.ns, page.title);

				if (page.revisions.length === 0) {
					throw new ApiError('No revisions returned');
				}

				return new PageInfo(pageTitle, page.revisions[0]);
			});
	}
}
