import StripState from './StripState';

export default class EditingContext {
	/** @var {Site} */
	_site;
	_title;
	_text;
	_originalText;
	/** @var {StripState} */
	_stripState;
	_summaries = [];
	_skipCategory = null;
	_skipMessage = '';

	/**
	 * @param {Site} site
	 * @param {Title} title
	 * @param {string} text
	 */
	constructor(site, title, text) {
		this._site = site;
		this._title = title;
		this._text = this._originalText = text;
	}

	get text() {
		return this._text;
	}

	get originalText() {
		return this._originalText;
	}

	get site() {
		return this._site;
	}

	change(newText, summary = null) {
		if (this._text === newText) {
			return;
		}
		this._text = newText;
		if (summary !== null) {
			this._summaries.push(summary);
		}
	}

	skip(category, message) {
		this._skipCategory = category;
		this._skipMessage = message;
	}

	strip() {
		if (this._stripState) {
			throw new Error('Attempted to call strip() for a second time');
		}
		this._stripState = new StripState();
		this._text = this._stripState.strip(this._text);
	}

	unstrip() {
		if (!this._stripState) {
			throw new Error('unstrip() called without a strip state');
		}
		this._text = this._stripState.unstrip(this._text);
		delete this._stripState;
	}

	finalize() {
		if (this._stripState) {
			this.unstrip();
		}
		return this._text;
	}

	get hasChanges() {
		return this._text !== this._originalText;
	}

	get summaries() {
		return this._summaries;
	}

	get skipInfo() {
		if (this._skipCategory === null) {
			return false;
		}
		return { category: this._skipCategory, message: this._skipMessage };
	}
}
