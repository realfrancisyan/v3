import { AppProps } from 'next/app';
import Radium from 'radium';
import { GlobalStyles } from '../styles';
import '../assets/css/reset.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Radium.StyleRoot>
			<GlobalStyles />
			<Component {...pageProps} />
		</Radium.StyleRoot>
	);
}

export default MyApp;
