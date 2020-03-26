import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Radium from 'radium';
import { theme, layout } from '../styles';

const { colors } = theme;

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
		background: 'linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)'
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
	logo: {
		width: 15,
		height: 15,
		backgroundColor: colors.white,
		borderRadius: '50%'
	},
	logoTitle: {
		fontSize: 20,
		marginLeft: 10
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
}

class Header extends React.Component<{}, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			title: 'Jiajun Yan'
		};
	}
	render() {
		const { title } = this.state;
		return (
			<header style={header.self}>
				<Head>
					<title>{title}</title>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>
				<div style={header.wrapper}>
					<div style={header.logoWrapper}>
						<div style={header.logo} />
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
