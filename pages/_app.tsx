import { AppProps } from 'next/app';
import Radium from 'radium';
import { GlobalStyles } from '../styles';
import Footer from '../components/Footer';
import '../assets/css/reset.css';

const { StyleRoot } = Radium;

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<StyleRoot>
			<GlobalStyles />
			<Component {...pageProps} />
			<Footer />
		</StyleRoot>
	);
}

export default MyApp;
