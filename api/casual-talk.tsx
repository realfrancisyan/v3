import request from '../request';
import BASE_URL from '../request/server';

const getPosts = (data = {}) => {
	return request.get(`${BASE_URL}/talk/public/getPosts`, data);
};

export default {
	getPosts,
};
