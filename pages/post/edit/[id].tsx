import Radium from 'radium';
import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { layout, theme } from '../../../styles';
import { NextPageContext } from 'next';
import blog from '../../../api/blog';
import { IProps } from '../../../interfaces/[id].interface';
import Router from 'next/router';

const { colors } = theme;

export const inputArea = {
	self: {
		display: 'flex',
		flexDirection: 'column' as 'column',
		width: '60%',
		...layout.alignCenter,
		marginTop: 80,
		padding: '100px 0'
	},
	title: {
		border: 'none',
		padding: 20,
		marginBottom: 20,
		boxSizing: 'border-box' as 'border-box'
	},
	content: {
		border: 'none',
		padding: 20,
		marginBottom: 20,
		boxSizing: 'border-box' as 'border-box',
		height: 300
	},
	submit: {
		border: 'none',
		padding: 20,
		color: colors.white,
		background: colors.lightBlue,
		transition: 'all .2s',
		':disabled': {
			background: colors.gray,
			cursor: 'not-allowed'
		}
	}
};

const getSingleBlogPost = async (id: string | Array<string>) => {
	const post = await blog.getSinglePost({ id });
	return post.data;
};

const Edit = (props: IProps) => {
	const [title, setTitle] = useState('');
	const [subTitle, setSubTitle] = useState('');
	const [content, setContent] = useState('');
	const [pageTitle, setPageTitle] = useState({});

	useEffect(() => {
		if (props.post) {
			const { title, body, description } = props.post;
			setTitle(title);
			setSubTitle(description);
			setContent(body);
			setPageTitle({ title });
		} else {
			Router.push({ pathname: '/' });
		}
	});

	if (!props.post) return null;
	return (
		<React.Fragment>
			<Header {...pageTitle} />
			<div style={inputArea.self}>
				<input
					style={inputArea.title}
					type="text"
					placeholder="请输入标题"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<input
					style={inputArea.title}
					type="text"
					placeholder="请输入副标题"
					value={subTitle}
					onChange={e => setSubTitle(e.target.value)}
				/>
				<textarea
					style={inputArea.content}
					placeholder="请输入内容"
					value={content}
					onChange={e => setContent(e.target.value)}
				></textarea>
				<button style={inputArea.submit} disabled={!title || !content}>
					提交
				</button>
			</div>
			<Footer />
		</React.Fragment>
	);
};

Edit.getInitialProps = async (context: NextPageContext) => {
	const { id } = context.query;

	if (id) {
		const post = await getSingleBlogPost(id);
		return { post };
	}

	return {};
};

export default Radium(Edit);
