export default class ApiError extends Error {
	constructor(message) {
		super(message ? message : 'Unexpected response received from the API');
	}
}
