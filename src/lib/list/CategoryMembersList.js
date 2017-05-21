import ListBuilder from './ListBuilder';

export default class CategoryMembersList extends ListBuilder {
	_category;

	get name() {
		return 'Category members';
	}

	get apiPath() {
		return 'categorymembers';
	}

	get category() {
		return this._category;
	}

	set category(value) {
		this._category = value;
	}

	getQueryParameters() {
		return {
			list: 'categorymembers',
			cmtitle: this.category
		};
	}
}
