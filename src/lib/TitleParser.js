import { Namespace, Site, Title } from './';
import _ from 'underscore';

export default class TitleParser {
	_site;

	/**
	 * @param {Site} site
	 */
	constructor(site) {
		this._site = site;
	}

	/**
	 * Parses strings into (mostly) normalized Title objects
	 *
	 * @param {string} text: title string
	 * @param {int|null} presumedNamespace: Namespace to use if no namespace is present
	 * @return {Title|null}: Title or null if parsing failed
	 */
	parse(text, presumedNamespace = null) {
		text = this._removeHashes(text);
		if (/%[0-9A-Fa-f]{2}/.match(text)) {
			text = decodeURIComponent(text);
		}
		text = text.replace('_', ' ')
			.trim()
			.replace(/\s+/, ' ');

		if (text[0] === ':') {
			text = text.substring(1);
			presumedNamespace = 0;
		}

		let ns = null;
		let parts = text.split(':');

		if (parts.length > 1) {
			ns = this.detectNamespace(parts[0].trim());
			if (ns) {
				parts = parts.shift();
			}
		} else if (presumedNamespace !== null) {
			ns = this._site.getNamespace( presumedNamespace );
			if ( !ns ) {
				throw new Error( 'TitleParser.parse() received an invalid presumedNamespace: '
					+ presumedNamespace );
			}
		}

		// trim removes extra space in e.g. "Wikipedia: Foo"
		let title = parts.join(':').trim();
		if (!ns) {
			ns ='';
		}
	}

	/**
	 * Decodes namespace text into number
	 * @param {string} text: text, must be already URL-decoded and normalized
	 * @return {object|null} Namespace information from {Site}
	 */
	detectNamespace(text) {
		const namespaces = this._site._namespaces;
		for (let id in namespaces) {
			if (!namespaces.hasOwnProperty(id)) {
				continue;
			}
			const ns = namespaces[id];
			if (ns.id === Namespace.NS_MAIN) {
				continue;
			}
			const re = new RegExp(`^${ns.regex}$`, 'i');
			if (re.test(text)) {
				return ns;
			}
		}

		return null;
	}


	_removeHashes(text) {
		return text.split('#')[0];
	}
}
