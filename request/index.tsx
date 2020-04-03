import fetch from 'isomorphic-unfetch';
import Cookies from 'universal-cookie';
import { IOptions } from '../interfaces/request.interface';
import resultObj from '../result';

class Request {
	private methods = {
		get: 'GET',
		post: 'POST',
		delete: 'DELETE',
		put: 'PUT'
	};
	private userInfo = 'userInfo';
	private cookies = new Cookies();

	// 设置 GET 方法的参数
	private setGetMethodParams(url: string, data = {}) {
		const _url = new URL(url);
		Object.keys(data).forEach(key => _url.searchParams.append(key, data[key]));
		return _url + '';
	}

	private setHeaders() {
		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8'
		};

		let userInfo = this.getUserInfo();

		if (userInfo) {
			console.log('has userInfo - ', userInfo);
			headers['Authorization'] = `Bearer ${userInfo.token}`;
		} else {
			console.log('no userInfo - ', userInfo);
			this.setUserInfo(); // @to-do 有真正的登录后删除
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

		const result = fetch(url, options).then(res => res.json());
		return result;
	}

	private setUserInfo() {
		const { data } = resultObj;
		this.cookies.set(this.userInfo, data);
	}

	private getUserInfo() {
		return this.cookies.get(this.userInfo);
	}

	logout() {
		this.cookies.remove(this.userInfo);
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
