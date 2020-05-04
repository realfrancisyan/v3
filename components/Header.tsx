import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Radium from 'radium';
import { theme, layout } from '../styles';
import { IProps } from '../interfaces/header.interface';
import request from '../request';
import Router from 'next/router';

const { colors, fontWeight } = theme;

const gradient =
	'linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)';
const boxShadow = '0 1px 10px 5px rgba(0,0,0,0.1)';

const header = {
	self: {
		position: 'fixed' as 'fixed',
		zIndex: 999,
		color: colors.white,
		top: 0,
		left: 0,
		width: '100%',
		height: 80,
		display: 'flex',
		flexDirection: 'column' as 'column',
		justifyContent: 'center',
		background: gradient,
		transition: 'all .2s',
		boxShadow: 'none',
	},
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		...layout.contentSize.desktop,
		...layout.alignCenter,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			...layout.contentSize.mobile,
		},
	},
	logoWrapper: {
		display: 'flex',
		alignItems: 'center',
	},
	logoTitle: {
		fontSize: 20,
		fontWeight: fontWeight.ultra,
		color: colors.white,
		textDecoration: 'none',
		outline: 'none',
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			fontSize: 16,
		},
	},
	list: {
		display: 'flex',
	},
	listItem: {
		marginLeft: 20,
	},
	anchor: {
		textTransform: 'capitalize' as 'capitalize',
		color: colors.white,
		textDecoration: 'none',
		cursor: 'pointer',
		[`@media screen and (min-width: ${layout.screen.laptop}px)`]: {
			':hover': {
				color: colors.plainWhite,
			},
		},
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			fontSize: 14,
		},
	},
};

const Header = (props: IProps) => {
	const [title, setTitle] = useState('Jiajun Yan');
	const [backgroundSwitch, setBackgroundSwitch] = useState(false);
	const [userInfo, setUserInfo] = useState(null);

	// 添加滚动监听转换背景效果
	const onScroll = () => {
		const scrollTop =
			window.pageYOffset ||
			document.documentElement.scrollTop ||
			document.body.scrollTop;

		const screenWidth = screen.width;
		const scrollHeight = screenWidth >= 1060 ? 250 : 100; // 区分桌面端和移动端的滑动距离
		setBackgroundSwitch(scrollTop > scrollHeight);
	};

	const logout = () => {
		request.logout();
		setUserInfo(null);
		Router.push({ pathname: '/' });
	};

	useEffect(() => {
		const getUserInfo = async () => {
			const _userInfo = await request.getUserInfo();
			setUserInfo(_userInfo);
		};
		if (!userInfo) getUserInfo();
	});

	useEffect(() => {
		if (props.title) setTitle(`${props.title} - Jiajun Yan`); // 设置页面标题
		window.addEventListener('scroll', onScroll);

		// 防止报错
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	});

	const headerSelf = header.self;
	headerSelf.background = backgroundSwitch ? colors.lightGray : gradient;
	headerSelf.boxShadow = backgroundSwitch ? boxShadow : 'none';
	return (
		<header style={headerSelf}>
			<Head>
				<title>{title}</title>
			</Head>
			<div style={header.wrapper}>
				<div style={header.logoWrapper}>
					<h1>
						<Link href="/">
							<a style={header.logoTitle}>Jiajun Yan</a>
						</Link>
					</h1>
				</div>
				<ul style={header.list}>
					<li style={header.listItem}>
						<Link href="https://github.com/realfrancisyan" prefetch={false}>
							<a style={header.anchor} target="_blank" key="Github">
								Github
							</a>
						</Link>
					</li>
					{userInfo ? (
						<li style={header.listItem} onClick={logout}>
							<span style={header.anchor}>{userInfo.user.name} 登出</span>
						</li>
					) : (
						<li style={header.listItem}>
							<Link href="/auth" prefetch={false}>
								<a style={header.anchor} key="login">
									登录
								</a>
							</Link>
						</li>
					)}
				</ul>
			</div>
		</header>
	);
};

export default Radium(Header);
