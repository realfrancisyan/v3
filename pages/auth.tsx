import React from 'react';
import Radium from 'radium';
import Router from 'next/router';
import { NextPageContext } from 'next';
import Header from '../components/Header';
import user from '../api/user';
import { IProps } from '../interfaces/auth.interface';
import { theme } from '../styles';

const { colors } = theme;

const form = {
	self: {
		width: '100vw',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column' as 'column'
	},
	descWrapper: {
		display: 'flex',
		alignItems: 'center',
		marginTop: 20
	},
	refresh: {
		color: colors.purple,
		marginLeft: 10,
		cursor: 'pointer',
		fontSize: 14,
		':hover': {
			textDecoration: 'underline'
		}
	}
};

const getQRCode = async () => {
	const result = await user.generateQRCode();
	return result.data.code || null;
};

const refreshCode = () => {
	Router.push({ pathname: '/auth' });
};

const Auth = (props: IProps) => {
	const headerProps = {
		title: '登录'
	};
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
	const qrCode = await getQRCode();

	return {
		qrCode
	};
};

export default Radium(Auth);
