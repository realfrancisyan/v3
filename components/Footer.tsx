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
		paddingBottom: 20
	},
	title: {
		marginRight: 20,
		fontSize: 30,
		fontWeight: fontWeight.ultra
	},
	copyright: {
		alignSelf: 'flex-end',
		fontSize: 14,
		color: colors.gray
	},
	links: {
		display: 'flex',
		alignItems: 'center'
	},
	anchor: {
		marginRight: 20,
		fontSize: 14,
		textDecoration: 'none',
		display: 'flex',
        alignItems: 'center',
        color: colors.gray,
		':hover': {
			textDecoration: 'underline'
		}
    },
    icon: {
        marginRight: 5,
        width: 15,
        height: 15
    }
};

class Footer extends React.Component {
	render() {
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
