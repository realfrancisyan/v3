import React from 'react';
import Radium from 'radium';
import { GlobalStyles, ResetStyles, theme, layout } from '../styles';
import Header from '../components/Header'
import HeroBackground from '../assets/images/hero.jpg';

const { colors, fontWeight } = theme;

const jumbotron = {
	self: {
		width: '100%',
		height: 400,
		backgroundColor: colors.gray,
		backgroundImage: `url(${HeroBackground})`,
		backgroundSize: 'cover',
		display: 'flex',
		position: 'relative' as 'relative'
	},
	cover: {
		position: 'absolute' as 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0.1)',
		zIndex: 0
	},
	titleWrapper: {
		position: 'relative' as 'relative',
		alignSelf: 'flex-end',
		zIndex: 1,
		...layout.contentSize.desktop,
		marginBottom: 100
	},
	title: {
		fontSize: 80,
		color: colors.white,
		fontWeight: fontWeight.ultra,
	}
};

class Index extends React.Component {
	render() {
		return (
			<React.Fragment>
				<ResetStyles />
				<GlobalStyles />
				<Header></Header>
				<div style={jumbotron.self}>
					<div style={jumbotron.cover}></div>
					<div style={jumbotron.titleWrapper}>
						<h1 style={jumbotron.title}>Jiajun Yan</h1>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Radium(Index);
