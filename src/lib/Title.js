import Namespace from './Namespace';

export default class Title {
	_namespace;
	_prefixedText;
	_text;

	/**
	 * This constructor expects all input to be already sanitized and normalized
	 *
	 * @param {int} namespace
	 * @param {string} prefixedText
	 * @param {string|null} text
	 */
	constructor(namespace, prefixedText, text = null) {
		this._namespace = namespace;
		this._prefixedText = prefixedText;
		this._text = text;
	}

	get namespace() {
		return this._namespace;
	}

	get prefixedText() {
		return this._prefixedText;
	}

	get text() {
		if (this._text === null) {
			const pos = this._namespace === Namespace.NS_MAIN
				? -1
				: this._prefixedText.indexOf(':');
			if (pos < 0) {
				this._text = this._prefixedText;
			} else {
				this._text = this._prefixedText.substring(pos + 1);
			}
		}

		return this._text;
	}

	get wikiEscaped() {
		return encodeURIComponent(this.prefixedText.replace(/ /g, '_'))
			.replace(/%2F/g, '/')
			.replace(/%3A/g, ':');
	}

	equals(title) {
		return this.namespace === title.namespace && this.prefixedText === title.prefixedText;
	}
}
