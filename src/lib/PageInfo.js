export default class PageInfo {
	/** @var {Title} */
	_title;
	_data;

	constructor(title, dataFromApi) {
		this._title = title;
		this._data = dataFromApi;
	}

	get title() {
		return this._title;
	}

	get revId() {
		return this._data.revid;
	}

	get timestamp() {
		return this._data.timestamp;
	}

	get contentModel() {
		return this._data.contentmodel;
	}

	get content() {
		return this._data.content;
	}
}
