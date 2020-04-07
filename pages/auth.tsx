import React, { useEffect } from 'react';
import Radium from 'radium';
import Router from 'next/router';
import Header from '../components/Header';
import user from '../api/user';
import { IProps } from '../interfaces/auth.interface';
import { theme } from '../styles';
import io from 'socket.io-client';
import request from '../request';
import BASE_URL from '../request/server';

const { colors } = theme;
const socket = io(BASE_URL);

const form = {
	self: {
		width: '100vw',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column' as 'column',
	},
	descWrapper: {
		display: 'flex',
		alignItems: 'center',
		marginTop: 20,
	},
	refresh: {
		color: colors.purple,
		marginLeft: 10,
		cursor: 'pointer',
		fontSize: 14,
		':hover': {
			textDecoration: 'underline',
		},
	},
};

const getQRCode = async () => {
	const result = await user.generateQRCode();
	const { code, id } = result.data;
	return { code, id };
};

const refreshCode = () => {
	Router.push({ pathname: '/auth' });
};

const openSocket = () => {
	const onSuccess = () => {
		console.log('connected');
	};
	socket.on('connect', onSuccess);
};

const Auth = (props: IProps) => {
	const headerProps = { title: '登录' };

	useEffect(() => {
		socket.on('loginViaCode', (data: any) => {
			if (props.id === data.id) {
				request.setUserInfo(data);
				Router.push({ pathname: '/' });
			}
		});
	});
	return (
		<React.Fragment>
			<Header {...headerProps} />
			<article style={form.self}>
				<img src={props.qrCode} alt="qr code" />
				<div style={form.descWrapper}>
					<p>请使用客户端扫码登录</p>
					<span style={form.refresh} onClick={refreshCode}>
						刷新二维码
					</span>
				</div>
			</article>
		</React.Fragment>
	);
};

Auth.getInitialProps = async () => {
	const { code, id } = await getQRCode();
	openSocket();

	return { qrCode: code, id };
};

export default Radium(Auth);
