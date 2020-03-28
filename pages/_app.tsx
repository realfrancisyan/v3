import { AppProps } from 'next/app';
import Radium from 'radium';
import { ResetStyles, GlobalStyles } from '../styles';
import Footer from '../components/Footer';

const { StyleRoot } = Radium;

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<StyleRoot>
			<ResetStyles />
			<GlobalStyles />
			<Component {...pageProps} />
			<Footer />
		</StyleRoot>
	);
}

export default MyApp;
