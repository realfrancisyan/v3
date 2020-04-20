import React, { useState, useEffect } from 'react';
import Radium from 'radium';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BeiAnIcon from '../assets/images/beian.png';
import { layout, theme } from '../styles';

const { colors, fontWeight } = theme;

const footer = {
	self: {
		...layout.contentSize.desktop,
		...layout.alignCenter,
		padding: '40px 0',
		[`@media screen and (max-width: ${layout.screen.desktop}px)`]: {
			width: '80%',
		},
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			...layout.contentSize.mobile
		}
	},
	titleWrapper: {
		display: 'flex',
		paddingBottom: 20,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			flexDirection: 'column'
		}
	},
	title: {
		marginRight: 20,
		fontSize: 30,
		fontWeight: fontWeight.ultra,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			marginRight: 0,
			marginBottom: 10,
			fontSize: 16
		}
	},
	copyright: {
		alignSelf: 'flex-end',
		fontSize: 14,
		color: colors.gray,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			alignSelf: 'auto'
		}
	},
	links: {
		display: 'flex',
		alignItems: 'center',
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			flexDirection: 'column',
			alignItems: 'stretch'
		}
	},
	anchor: {
		marginRight: 20,
		fontSize: 14,
		textDecoration: 'none',
		display: 'flex',
		alignItems: 'center',
		color: colors.gray,
		[`@media screen and (min-width: ${layout.screen.laptop}px)`]: {
			':hover': {
				textDecoration: 'underline'
			}
		},
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			marginBottom: 5
		}
	},
	icon: {
		marginRight: 5,
		width: 15,
		height: 15
	}
};

const Footer = () => {
	const pageToShrink = ['/post/[id]']; // 需要将 footer 的宽度缩小的页面
	const router = useRouter();
	const [footerStyle, setFooterStyle] = useState(footer);
	useEffect(() => {
		if (pageToShrink.includes(router.pathname)) {
			footerStyle.self.width = '60%';
		}
		setFooterStyle(footerStyle);
	});
	return (
		<footer style={footerStyle.self}>
			<div style={footerStyle.titleWrapper}>
				<h2 style={footerStyle.title}>Jiajun Yan</h2>
				<p style={footerStyle.copyright}>
					© 2017-{moment().format('YYYY')} Jiajun Yan. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Radium(Footer);
