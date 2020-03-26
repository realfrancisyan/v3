import request from '../request';
import BASE_URL from '../request/server';

const getPosts = (data = {}) => {
	return request.get(`${BASE_URL}/blog/public/getPosts`, data);
};

const getTags = (data = {}) => {
	return request.get(`${BASE_URL}/blog/public/getTags`, data);
};

export default {
	getPosts,
	getTags
};
