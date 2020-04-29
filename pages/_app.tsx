import { AppProps } from 'next/app';
import Radium from 'radium';
import { GlobalStyles } from '../styles';
import '../assets/css/reset.css';
import NProgress from 'nprogress';
import Router from 'next/router';
import Head from 'next/head';

Router.events.on('routeChangeStart', () => {
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<Radium.StyleRoot>
			<Head>
				<meta
					name="viewport"
					content="initial-scale=1,maximum-scale=1, minimum-scale=1"
				/>
				<link rel="stylesheet" type="text/css" href="/inter/inter.css" />
				<link rel="stylesheet" type="text/css" href="/nprogress.css" />
			</Head>
			<GlobalStyles />
			<Component {...pageProps} />
		</Radium.StyleRoot>
	);
};

export default MyApp;
