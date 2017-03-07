import _ from 'underscore';

/**
 * Replaces certain parts of page text with strip tokens
 */
export default class StripState {
	static TOKEN_START = '⌞⌞⌞';
	static TOKEN_END = '⌟⌟⌟';

	static basicRegexes = [
		/⌞⌞⌞\d+⌟⌟⌟/g,
		/<nowiki.*>[^]*?<\s*\/\s*nowiki>/gim,
		/<!--[^]*?-->/gim
	];

	_originalText = '';
	_returnedText = '';
	_removals = [];
	_moreRemovals = [];

	strip(text) {
		if (this.count > 0) {
			throw new Error('Trying to reuse a StripState');
		}
		this._originalText = text;
		text = this._replace(text, StripState.basicRegexes, this._removals);
		this._returnedText = text;

		return text;
	}

	unstrip(text) {
		if (text === this._returnedText) {
			return this._originalText;
		}

		_.each(this._removals, (repl) => {
			const re = new RegExp(repl[0], 'g'); // Replace all occurences in case something got duplicated
			text = text.replace(re, repl[1]);
		});

		return text;
	}

	get count() {
		return this._removals.length + this._moreRemovals.length;
	}

	get _nextToken() {
		return StripState.TOKEN_START + this.count + StripState.TOKEN_END;
	}

	_replace(text, regexes, removals) {
		regexes.forEach(regex => {
			if (!regex.global) {
				throw new Error(`Regular expression ${regex} is not global`);
			}

			let match;
			let alteredText = text;
			while ((match = regex.exec(text)) !== null) {
				const token = this._nextToken;
				removals.push([ token, match[0] ]);
				alteredText = alteredText.replace(match, token);
			}

			text = alteredText;
		});

		return text;
	}
}
