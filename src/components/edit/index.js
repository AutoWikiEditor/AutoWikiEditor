import { h, Component } from 'preact';
import ApiOpenForEditing from '../../lib/api/ApiOpenForEditing';
import Title from '../../lib/Title';
import style from './style';

export default class Edit extends Component {
	// gets called when this route is navigated to
	componentDidMount() {
	}

	render({ page }, { pageInfo }) {
		if ( !pageInfo ) {
			let api = new ApiOpenForEditing( 'https://en.wikipedia.org/w/' );
			let title = new Title( 0, page );

			api.open( title )
				.then( pi => {
					this.setState( { pageInfo: pi } );
				} );

			return (<div>Loading...</div>);
		}
		return (
			<div style={style.content}>
				<textarea class={style.mainEditor}>{ pageInfo.content }</textarea>
			</div>
		);
	}
}
