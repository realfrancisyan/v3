import request from '../request';
import BASE_URL from '../request/server';

const getPosts = (data = {}) => {
	return request.get(`${BASE_URL}/blog/public/getPosts`, data);
};

const getTags = (data = {}) => {
	return request.get(`${BASE_URL}/blog/public/getTags`, data);
};

const getSinglePost = (data = {}) => {
	return request.get(`${BASE_URL}/blog/public/getSinglePost`, data);
};

const editPost = (data = {}) => {
	return request.post(`${BASE_URL}/blog/post/edit`, data);
};

const createPost = (data = {}) => {
	return request.post(`${BASE_URL}/blog/post/create`, data);
};

const deletePost = (data = {}) => {
	return request.delete(`${BASE_URL}/blog/post/delete`, data);
};

export default {
	getPosts,
	getTags,
	getSinglePost,
	editPost,
	createPost,
	deletePost
};
