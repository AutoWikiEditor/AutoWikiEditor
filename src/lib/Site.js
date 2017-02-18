import url from 'url';
import _ from 'underscore';

export default class Site {
	_url;
	_data;
	_namespaces;

	constructor(url, dataFromApi) {
		this._url = url;
		this._data = dataFromApi.general;
		this._namespaces = this._processNamespaces(dataFromApi.namespaces,
			dataFromApi.namespacealiases);
	}

	_processNamespaces(namespaces, namespaceAliases) {
		namespaceAliases.forEach(alias => {
			if (!namespaces[alias.id].aliases) {
				namespaces[alias.id].aliases = [];
			}
			namespaces[alias.id].aliases.push(alias.alias);
		});

		_.each(namespaces, ns => {
			if (ns.name === '') {
				ns.regex = null;
				return;
			}
			let names = [ns.name];
			if (ns.canonical !== undefined && ns.canonical !== ns.name) {
				names.push(ns.canonical);
			}
			if (ns.aliases) {
				ns.aliases.forEach(alias => names.push(alias));
			}
			ns.regex = '(' + names.map(name =>
				name.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
			).join('|') + ')';
		});

		return namespaces;
	}

	get url() {
		return this._url;
	}

	get host() {
		const parts = url.parse(this._url, false);
		return parts.hostname;
	}

	get namespaces() {
		return this._namespaces;
	}

	get case() {
		return this._data.case;
	}

	getNamespace(id) {
		return this._namespaces[id];
	}
}
