import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface IProps {
	language: string;
	value: any;
}

class CodeBlock extends PureComponent<IProps> {
	static propTypes = {
		value: PropTypes.string.isRequired,
		language: PropTypes.string
	};

	static defaultProps = {
		language: null
	};

	render() {
		const { language, value } = this.props;
		return (
			<SyntaxHighlighter
				language={language}
				style={atomDark}
			>
				{value}
			</SyntaxHighlighter>
		);
	}
}

export default CodeBlock;
