import Radium from 'radium';
import React, { useState } from 'react';
import Router from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import blog from '../../api/blog';
import { IProps, ITag } from '../../interfaces/edit.[id].interface';
import { inputArea } from './edit/[id]';

const getBlogTags = async () => {
	const result = await blog.getTags();
	return result.data;
};

const Add = (props: IProps) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [content, setContent] = useState('');
	const [tag, setTag] = useState(0);
	const pageTitle = { title: '新增文章' };

	const createPost = async () => {
		const params = { title, description, content, type: +tag };
		const result = await blog.createPost(params);
		if (result.message === 'SUCCESS') {
			Router.push({ pathname: '/post/[id]' }, `/post/${result.data}`);
		}
	};

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
					onChange={e => setTag(+e.target.value)}
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
					onClick={createPost}
				>
					提交
				</button>
			</div>
			<Footer />
		</React.Fragment>
	);
};

Add.getInitialProps = async () => {
	const tags = await getBlogTags();
	return { tags };
};

export default Radium(Add);
