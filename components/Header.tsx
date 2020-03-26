import React from 'react';
import Link from 'next/link';
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
        ...layout.contentSize.desktop
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
		textDecoration: 'none'
	}
};

class Header extends React.Component {
	render() {
		return (
			<header style={header.self}>
				<div style={header.wrapper}>
					<div style={header.logoWrapper}>
						<div style={header.logo} />
						<h1 style={header.logoTitle}>Jiajun Yan</h1>
					</div>
					<ul style={header.list}>
						<li style={header.listItem}>
							<Link href="https://www.linkedin.com/in/yanjiajun">
								<a style={header.anchor}>LinkedIn</a>
							</Link>
						</li>
						<li style={header.listItem}>
							<Link href="https://github.com/realfrancisyan">
								<a style={header.anchor}>Github</a>
							</Link>
						</li>
						<li style={header.listItem}>
							<Link href="https://www.instagram.com/jiajun.yan.travel">
								<a style={header.anchor}>Instagram</a>
							</Link>
						</li>
					</ul>
				</div>
			</header>
		);
	}
}

export default Radium(Header);
