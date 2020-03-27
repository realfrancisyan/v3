import { AppProps } from 'next/app';
import Radium from 'radium';
import { ResetStyles, GlobalStyles } from '../styles';

const { StyleRoot } = Radium;

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<StyleRoot>
			<ResetStyles />
			<GlobalStyles />
			<Component {...pageProps} />
		</StyleRoot>
	);
}

export default MyApp;
