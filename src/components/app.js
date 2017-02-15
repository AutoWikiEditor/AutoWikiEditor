import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Home from './home';
import Profile from './profile';
import Edit from './edit';

export default class App extends Component {
	/**
	 * Gets fired when the route changes.
	 *
	 * @param {Object} e.event		"change" event from [preact-router](http://git.io/preact-router)
	 * @param {string} e.event._url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<div id="content">
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Edit path="/edit/:page" />
						<Profile path="/profile/" user="me" />
						<Profile path="/profile/:user" />
					</Router>
				</div>
			</div>
		);
	}
}
