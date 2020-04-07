import fetch from 'isomorphic-unfetch';
import Cookies from 'universal-cookie';
import { IOptions } from '../interfaces/request.interface';

const USER_INFO = 'userInfo';
export const cookies = new Cookies();

class Request {
	private methods = {
		get: 'GET',
		post: 'POST',
		delete: 'DELETE',
		put: 'PUT',
	};

	// 设置 GET 方法的参数
	private setGetMethodParams(url: string, data = {}) {
		const _url = new URL(url);
		Object.keys(data).forEach((key) =>
			_url.searchParams.append(key, data[key])
		);
		return _url + '';
	}

	private setHeaders() {
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8',
		};

		const userInfo = this.getUserInfo();

		if (userInfo) {
			headers['Authorization'] = `Bearer ${userInfo.token}`;
		}

		return headers;
	}

	private send(method: string, url: string, data = {}) {
		const headers = this.setHeaders();
		const options: IOptions = { method, headers };

		if (method === this.methods.get) {
			url = this.setGetMethodParams(url, data);
		} else {
			options.body = JSON.stringify(data);
		}

		const result = fetch(url, options).then((res) => res.json());
		return result;
	}

	setUserInfo(info: any) {
		const { data } = info;
		cookies.set(USER_INFO, data);
	}

	getUserInfo() {
		return cookies.get(USER_INFO);
	}

	logout() {
		cookies.remove(USER_INFO);
	}

	get(url: string, data?: any) {
		return this.send(this.methods.get, url, data);
	}

	post(url: string, data?: any) {
		return this.send(this.methods.post, url, data);
	}

	delete(url: string, data?: any) {
		return this.send(this.methods.delete, url, data);
	}

	put(url: string, data?: any) {
		return this.send(this.methods.put, url, data);
	}
}

export default new Request();
