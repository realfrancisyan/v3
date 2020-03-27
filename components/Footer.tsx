import React from 'react';
import Radium from 'radium';
import moment from 'moment';
import Link from 'next/link';
import BeiAnIcon from '../assets/images/beian.png';
import { layout, theme } from '../styles';

const { colors, fontWeight } = theme;

const footer = {
	self: {
		...layout.contentSize.desktop,
		...layout.alignCenter,
		padding: '40px 0'
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
		[`@media screen and (min-width: ${layout.screen.desktop}px)`]: {
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

class Footer extends React.Component {
	static async getInitialProps(context) {
		console.log(123);
		return {}
	}
	render() {
		const footerStyle = JSON.parse(JSON.stringify(footer));
		// console.log(this.props);
		// footerStyle.self.width = this.props['url'].;
		return (
			<footer style={footer.self}>
				<div style={footer.titleWrapper}>
					<h2 style={footer.title}>Jiajun Yan</h2>
					<p style={footer.copyright}>
						© 2017-{moment().format('YYYY')} Jiajun Yan. All rights reserved.
					</p>
				</div>
				<ul>
					<li style={footer.links}>
						<Link href="http://www.beian.miit.gov.cn/" prefetch={false}>
							<a style={footer.anchor} target="_blank" key="beian1">
								<span>粤 ICP 备 19153485 号</span>
							</a>
						</Link>
						<Link href="http://www.beian.gov.cn" prefetch={false}>
							<a style={footer.anchor} target="_blank" key="beian2">
								<img style={footer.icon} src={BeiAnIcon} alt="bei an" />
								<span>粤公网安备 44010502001478 号</span>
							</a>
						</Link>
					</li>
				</ul>
			</footer>
		);
	}
}

export default Radium(Footer);
