import React from 'react';
import Radium from 'radium';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { NextPageContext } from 'next';
import { theme, layout } from '../../styles';
import blog from '../../api/blog';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../components/CodeBlock';

const { colors, fontWeight } = theme;

const jumbotron = {
	self: {
		paddingTop: 80,
		background: colors.lightGray
	},
	cover: {
		padding: '200px 0',
		width: '60%',
		...layout.alignCenter
	},
	title: {
		fontSize: 100,
		lineHeight: '120px',
		fontWeight: fontWeight.extraBold
	},
	name: {
		color: colors.purple
	},
	date: {
		display: 'block',
		fontSize: 26,
		paddingTop: 30
	}
};

const content = {
	self: {
		width: '60%',
		...layout.alignCenter,
		padding: '200px 0'
	}
};

const getSingleBlogPost = async (id: string | string[]) => {
	const post = await blog.getSinglePost({ id });
	return post.data;
};

interface IProps {
	post: IPost;
}

interface IPost {
	id: string;
	title: string;
	body: string;
	createdAt: string;
	type: number;
	description?: string;
}

class Post extends React.Component<IProps> {
	static async getInitialProps(context: NextPageContext) {
		const { id } = context.query;
		const post = await getSingleBlogPost(id);
		return { post };
	}
	render() {
		const { post } = this.props;
		return (
			<React.Fragment>
				<Header />
				<div style={jumbotron.self}>
					<div style={jumbotron.cover}>
						<h2 style={jumbotron.title}>{post.title}</h2>
						<p></p>
						<span style={jumbotron.date}>
							由 <span style={jumbotron.name}>Jiajun Yan</span> 于
							{moment(post.createdAt).format('YYYY年M月DD日')}
							编写
						</span>
					</div>
				</div>
				<article style={content.self} className="markdown">
					<ReactMarkdown
						source={post.body}
						renderers={{
							code: CodeBlock,
							image: props => {
								const image = {
									src: props.src.replace(
										'auracloudapp.oss-cn-shenzhen.aliyuncs.com',
										'assets.auracloudapp.com'
									)
								};
								return (
									<a
										href={image.src}
										target="_blank"
										rel="noopener noreferrer"
										style={{ outline: 'none' }}
									>
										<img
											className="post-img"
											src={image.src}
											alt={props.title}
										/>
									</a>
								);
							}
						}}
					></ReactMarkdown>
				</article>
				<style jsx global>{`
					article h1 {
						font-size: 48px;
						line-height: 72px;
						padding: 40px 0;
					}
					article h2 {
						font-size: 42px;
						line-height: 56px;
						padding: 40px 0;
					}
					article h3 {
						font-size: 36px;
						line-height: 48px;
						padding: 40px 0;
					}
					article h4 {
						font-size: 28px;
						line-height: 36px;
						padding: 40px 0;
					}
					article h5 {
						font-size: 24px;
						line-height: 32px;
						padding: 40px 0;
					}
					article h6 {
						font-size: 20px;
						line-height: 28px;
						padding: 40px 0;
					}
					article h1:first-child {
						padding-top: 0;
					}
					article h2:first-child {
						padding-top: 0;
					}
					article h3:first-child {
						padding-top: 0;
					}
					article h4:first-child {
						padding-top: 0;
					}
					article h5:first-child {
						padding-top: 0;
					}
					article h6:first-child {
						padding-top: 0;
					}
					article ul,
					article ol {
						padding: 20px 0 40px;
					}
					article ol li {
						list-style-type: decimal;
					}
					article ul li {
						list-style-type: circle;
					}
					article ul li,
					article ol li {
						font-size: 22px;
						line-height: 32px;
						padding: 5px 0;
					}
					article p {
						font-size: 22px;
						line-height: 32px;
						padding-bottom: 20px;
					}
					article p strong {
						font-weight: 600;
						padding-bottom: 20px;
					}
					article p img {
						display: block;
						width: 80%;
						margin: 20px auto;
					}
					article p code {
						color: #db70a9;
					}
					article blockquote {
						border-left: 2px solid #fd0fb0;
						padding-left: 20px;
						margin-bottom: 40px;
					}
					article a {
						color: #f6eef4;
					}
					article blockquote p {
						padding-bottom: 0;
					}
					article pre {
						margin-bottom: 40px !important;
					}
					article hr {
						border: 0;
					}
					article hr::before {
						display: block;
						content: '';
						width: 3px;
						height: 3px;
						margin: 2em auto;
						border-radius: 50%;
						background: #222;
						box-shadow: 24px 0 0 0 #222, -24px 0 0 0 #222;
					}
				`}</style>
				<Footer />
			</React.Fragment>
		);
	}
}

export default Radium(Post);
