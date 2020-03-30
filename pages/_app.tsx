import { AppProps } from 'next/app';
import Radium from 'radium';
import { GlobalStyles } from '../styles';
import '../assets/css/reset.css';
import NProgress from 'nprogress';
import Router from 'next/router';

Router.events.on('routeChangeStart', url => {
	console.log(`Loading: ${url}`);
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Radium.StyleRoot>
			<GlobalStyles />
			<Component {...pageProps} />
		</Radium.StyleRoot>
	);
}

export default MyApp;
