import Radium from 'radium';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { NextPageContext } from 'next';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { layout, theme } from '../../../styles';
import blog from '../../../api/blog';
import { IProps, ITag } from '../../../interfaces/edit.[id].interface';

const { colors } = theme;

export const inputArea = {
	self: {
		display: 'flex',
		flexDirection: 'column' as 'column',
		...layout.contentSize.desktop,
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
		height: 300,
		fontSize: 16
	},
	dropdown: {
		marginBottom: 20
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

const getBlogTags = async () => {
	const result = await blog.getTags();
	return result.data;
};

const Edit = (props: IProps) => {
	const { post } = props;
	const [title, setTitle] = useState(post ? post.title : '');
	const [description, setDescription] = useState(post ? post.description : '');
	const [content, setContent] = useState(post ? post.body : '');
	const [tag, setTag] = useState(post ? post.type : '');
	const pageTitle = post ? { title: post.title } : {};

	const editPost = async () => {
		const params = { id: post.id, title, description, content, type: +tag };
		const result = await blog.editPost(params);
		if (result.message === 'SUCCESS') {
			Router.push({ pathname: '/post/[id]' }, `/post/${post.id}`);
		}
	};

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
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>
				<textarea
					style={inputArea.content}
					placeholder="请输入内容"
					value={content}
					onChange={e => setContent(e.target.value)}
				></textarea>
				<select
					style={inputArea.dropdown}
					onChange={e => setTag(e.target.value)}
					value={tag}
				>
					{props.tags.map((tag: ITag) => {
						return (
							<option value={tag.type} key={tag.type}>
								{tag.name}
							</option>
						);
					})}
				</select>
				<button
					style={inputArea.submit}
					disabled={!title || !content}
					onClick={editPost}
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
		const tags = await getBlogTags();
		return { post, tags };
	}

	return {};
};

export default Radium(Edit);
