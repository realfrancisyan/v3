import request from '../request';
import BASE_URL from '../request/server';

const generateQRCode = () => {
	return request.get(`${BASE_URL}/user/generateQRCode`);
};

export default {
	generateQRCode
};
