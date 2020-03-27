import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Radium from 'radium';
import { theme, layout } from '../styles';

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
		boxShadow: 'none'
	},
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		...layout.contentSize.desktop,
		...layout.alignCenter
	},
	logoWrapper: {
		display: 'flex',
		alignItems: 'center'
	},
	logoTitle: {
		fontSize: 20,
		marginLeft: 10,
		fontWeight: fontWeight.ultra,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			fontSize: 16
		}
	},
	list: {
		display: 'flex'
	},
	listItem: {
		marginLeft: 20
	},
	anchor: {
		color: colors.white,
		textDecoration: 'none',
		':hover': {
			color: colors.plainWhite
		}
	}
};

interface IState {
	title: string;
	backgroundSwitch: boolean;
}

class Header extends React.Component<{}, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			title: 'Jiajun Yan',
			backgroundSwitch: false
		};

		this.onScroll = this.onScroll.bind(this);
	}
	componentDidMount() {
		window.addEventListener('scroll', this.onScroll);
	}
	// 根据滚动位置，更改导航栏背景
	onScroll() {
		const scrollTop =
			window.pageYOffset ||
			document.documentElement.scrollTop ||
			document.body.scrollTop;
		this.setState({ backgroundSwitch: scrollTop > 250 });
	}
	render() {
		const { title, backgroundSwitch } = this.state;
		const headerSelf = header.self;
		headerSelf.background = backgroundSwitch ? colors.lightGray : gradient;
		headerSelf.boxShadow = backgroundSwitch ? boxShadow : 'none';
		return (
			<header style={headerSelf}>
				<Head>
					<title>{title}</title>
					<meta
						name="viewport"
						content="initial-scale=1,maximum-scale=1, minimum-scale=1"
					/>
				</Head>
				<div style={header.wrapper}>
					<div style={header.logoWrapper}>
						<h1 style={header.logoTitle}>Jiajun Yan</h1>
					</div>

					<ul style={header.list}>
						<li style={header.listItem}>
							<Link
								href="https://www.linkedin.com/in/yanjiajun"
								prefetch={false}
							>
								<a style={header.anchor} target="_blank" key="LinkedIn">
									LinkedIn
								</a>
							</Link>
						</li>
						<li style={header.listItem}>
							<Link href="https://github.com/realfrancisyan" prefetch={false}>
								<a style={header.anchor} target="_blank" key="Github">
									Github
								</a>
							</Link>
						</li>
					</ul>
				</div>
			</header>
		);
	}
}

export default Radium(Header);
