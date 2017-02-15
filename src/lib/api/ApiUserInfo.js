import ApiQuery from './ApiQuery';
import UserInfo from '../UserInfo';

export default class ApiUserInfo extends ApiQuery {
	constructor(url) {
		super(url,
			{
				meta: 'userinfo|tokens',
				uiprop: 'groups|hasmsg|blockinfo',
				type: 'csrf'
			}
		);
	}

	getUserInfo() {
		return this.request().then(data => {
			if (!data.query || !data.query.userinfo) {
				throw new Error('ApiUserInfo received data without `query.userinfo` from API');
			}
			if (!data.query || !data.query.tokens) {
				throw new Error('ApiUserInfo received data without `query.userinfo` from API');
			}

			return new UserInfo(data.query.userinfo, data.query.tokens);
		});
	}
}
