import _ from 'underscore';
import Namespace from '../Namespace';

/**
 * One find & replace rule
 */
export default class ReplacementRule {
	static IsRegex = 1;
	static CaseInsensitive = 1 << 1;
	static Multiline = 1 << 2;
	//static Singleline = 1 << 3;
	static Disabled = 1 << 4;

	_find;
	_replace;

	/** @var {int} */
	_flags;
	_regex = null;

	/**
	 * @param {string} find
	 * @param {string} replace
	 * @param {int} flags
	 */
	constructor(find, replace, flags) {
		this._find = find;
		this._replace = replace;
		this._flags = flags;
	}

	get find() {
		return this._find;
	}

	get replace() {
		return this._replace;
	}

	get flags() {
		return this._flags;
	}

	get isEnabled() {
		return !(this._flags & ReplacementRule.Disabled);
	}

	get regex() {
		if (this._regex) {
			return this._regex;
		}

		let flags = 'g';
		let expr = this._find;

		if (this._flags & ReplacementRule.CaseInsensitive) {
			flags += 'i';
		}
		if (this._flags & ReplacementRule.IsRegex) {
			if (this._flags & ReplacementRule.Multiline) {
				flags += 'm';
			}
			// @todo: needs more work
			// if (this._flags & ReplacementRule.Singleline) {
			// 	expr = expr.replace(/(?!=\\{2,4,6,8,10})\./g, '[^]');
			// }
		} else {
			expr = expr.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
		}

		this._regex = new RegExp(expr, flags);

		return this._regex;
	}

	/**
	 *
	 * @param {string} text
	 * @param {string[]} replacements
	 * @return {string}
	 */
	apply(text, replacements) {
		return text.replace( this.regex, this._replace );
	}
}
