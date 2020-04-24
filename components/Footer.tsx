import React, { useState, useEffect } from 'react';
import Radium from 'radium';
import moment from 'moment';
import { layout, theme } from '../styles';

const { colors, fontWeight } = theme;

const footer = {
	self: {
		...layout.contentSize.desktop,
		...layout.alignCenter,
		padding: '40px 0',
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			...layout.contentSize.mobile,
		},
	},
	titleWrapper: {
		display: 'flex',
		paddingBottom: 20,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			flexDirection: 'column',
		},
	},
	title: {
		marginRight: 20,
		fontSize: 30,
		fontWeight: fontWeight.ultra,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			marginRight: 0,
			marginBottom: 10,
			fontSize: 16,
		},
	},
	copyright: {
		alignSelf: 'flex-end',
		fontSize: 14,
		color: colors.gray,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			alignSelf: 'auto',
		},
	},
	links: {
		display: 'flex',
		alignItems: 'center',
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			flexDirection: 'column',
			alignItems: 'stretch',
		},
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
				textDecoration: 'underline',
			},
		},
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			marginBottom: 5,
		},
	},
	icon: {
		marginRight: 5,
		width: 15,
		height: 15,
	},
};

const Footer = () => {
	return (
		<footer style={footer.self}>
			<div style={footer.titleWrapper}>
				<h2 style={footer.title}>Jiajun Yan</h2>
				<p style={footer.copyright}>
					© 2017-{moment().format('YYYY')} Jiajun Yan. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Radium(Footer);
