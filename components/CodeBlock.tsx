import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface IProps {
	language: string;
	value: string;
}

const CodeBlock = (props: IProps) => {
	const { language = null, value } = props;
	return (
		<SyntaxHighlighter language={language} style={atomDark}>
			{value}
		</SyntaxHighlighter>
	);
};

export default CodeBlock;
