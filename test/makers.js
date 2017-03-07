import Site from '../src/lib/Site';
import TitleParser from '../src/lib/TitleParser';
import EditingContext from '../src/lib/transformations/EditingContext';
const query = require('./data/siteinfo.json').query;


/**
 * @return {Site}
 */
export function makeSite() {
	// Deep clone
	const cloned = JSON.parse( JSON.stringify( query ) );
	return new Site( 'https://en.wikipedia.org/w/', cloned );
}

/**
 * @param {string} text
 * @param {string} titleText
 * @return {EditingContext}
 */
export function makeContext( text, titleText = 'Some title' ) {
	const site = makeSite();
	const title = new TitleParser( site ).parse( titleText );
	return new EditingContext( site, title, text );
}

