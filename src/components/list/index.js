import { h, Component } from 'preact';
import CategoryMembersList from '../../lib/list/CategoryMembersList';
import style from './style';

export default class List extends Component {
	render({ list }) {
		if (!list) {
			const listBuilder = new CategoryMembersList();
			listBuilder.category = 'Category:Presidents of the United States';
			listBuilder.makeList().then(list => console.log(list));
		}
	}
}
