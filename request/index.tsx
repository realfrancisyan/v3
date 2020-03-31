import fetch from 'isomorphic-unfetch';

interface IOptions {
	method: string;
	headers?: {};
	body?: any;
}

const methods = {
	get: 'GET',
	post: 'POST',
	delete: 'DELETE',
	put: 'PUT'
};

// 设置 GET 方法的参数
const setGetMethodParams = (url: string, data = {}) => {
	const _url = new URL(url);
	Object.keys(data).forEach(key => _url.searchParams.append(key, data[key]));
	return _url + '';
};

const send = async (method: string, url: string, data = {}) => {
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json;charset=UTF-8'
	};

	const options: IOptions = { method, headers };

	if (method === methods.get) {
		url = setGetMethodParams(url, data);
	} else {
		options.body = data;
	}

	const result = await fetch(url, options);
	return result.json();
};

export default {
	get: (url: string, data?: any) => send(methods.get, url, data),
	post: (url: string, data?: any) => send(methods.post, url, data),
	delete: (url: string, data?: any) => send(methods.delete, url, data),
	put: (url: string, data?: any) => send(methods.put, url, data)
};
