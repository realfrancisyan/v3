import Radium from 'radium';
import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { layout, theme } from '../../../styles';
import { NextPageContext } from 'next';
import blog from '../../../api/blog';
import { IProps } from '../../../interfaces/edit.[id].interface';
import Router from 'next/router';

const { colors } = theme;

export const inputArea = {
	self: {
		display: 'flex',
		flexDirection: 'column' as 'column',
		width: '60%',
		...layout.alignCenter,
		padding: '180px 0 100px',
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			...layout.contentSize.mobile
		}
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

const editPost = async ({ id, title, description, body, type }) => {
	console.log({ id, title, description, body, type });

	const params = { id, title, description, content: body, type };

	const result = await blog.editPost(params);

	console.log(result);
};

const Edit = (props: IProps) => {
	const { post } = props;
	const [title, setTitle] = useState(post ? post.title : '');
	const [subTitle, setSubTitle] = useState(post ? post.description : '');
	const [content, setContent] = useState(post ? post.body : '');
	const pageTitle = post ? { title: post.title } : {};

	useEffect(() => {
		if (!props.post) {
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
				<button
					style={inputArea.submit}
					disabled={!title || !content}
					onClick={() => editPost(props.post)}
				>
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
