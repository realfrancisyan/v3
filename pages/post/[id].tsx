import React, { useEffect, useState } from 'react';
import Radium from 'radium';
import Header from '../../components/Header';
import { NextPageContext } from 'next';
import { IProps } from '../../interfaces/[id].interface';
import { theme, layout } from '../../styles';
import blog from '../../api/blog';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../components/CodeBlock';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Router from 'next/router';
import request from '../../request';

const { colors, fontWeight } = theme;
let titles = []; // 侧边栏标题

const jumbotron = {
	self: {
		paddingTop: 80,
		background: colors.lightGray,
	},
	cover: {
		padding: '200px 0',
		...layout.contentSize.desktop,
		...layout.alignCenter,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			...layout.contentSize.mobile,
			padding: '100px 0',
		},
	},
	title: {
		fontSize: 100,
		lineHeight: '120px',
		fontWeight: fontWeight.extraBold,
		wordBreak: 'break-word' as 'break-word',
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			fontSize: 54,
			lineHeight: '59px',
		},
	},
	description: {
		width: '90%',
		fontSize: 25,
		lineHeight: '36px',
		color: colors.gray,
		padding: '20px 0',
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			width: '100%',
			fontSize: 21,
			lineHeight: '26px',
			padding: '10px 0',
		},
	},
	name: {
		color: colors.purple,
	},
	date: {
		display: 'block',
		fontSize: 26,
		paddingTop: 30,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			fontSize: 16,
			lineHeight: '23px',
		},
	},
};

const content = {
	self: {
		...layout.contentSize.desktop,
		...layout.alignCenter,
		display: 'flex',
		justifyContent: 'space-between',
		padding: '200px 0',
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			...layout.contentSize.mobile,
			padding: '100px 0',
		},
	},
	article: {
		width: '70%',
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			width: '100%',
		},
	},
	title: {
		paddingTop: '140px',
		marginTop: '-100px',
	},
	sidebar: {
		paddingTop: 40,
		width: '25%',
		position: 'relative' as 'relative',
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			display: 'none',
		},
	},
	catalog: {
		marginBottom: '10px',
		paddingLeft: '15px',
	},
	sidebarWrapper: {
		position: 'sticky' as 'sticky',
		top: 100,
		maxHeight: '600px',
		overflowY: 'auto' as 'auto',
		padding: '5px 10px 5px 15px',
		background: colors.lightGray,
		borderRadius: '8px',
	},
	sidebarTitle: {
		display: 'inline-block',
		lineHeight: '24px',
		color: colors.plainWhite,
		textDecoration: 'none',
		padding: '2px 0',
	},
};

const control = {
	options: {
		display: 'flex',
		paddingTop: 20,
	},
	edit: {
		color: colors.white,
		textDecoration: 'none',
		marginRight: 10,
		':hover': {
			textDecoration: 'underline',
		},
	},
	delete: {
		color: colors.red,
		cursor: 'pointer',
		':hover': {
			textDecoration: 'underline',
		},
	},
};

const getSingleBlogPost = async (id: string | Array<string>) => {
	const post = await blog.getSinglePost({ id });
	return post.data;
};

const HeadingComponent = (props: any) => {
	if (props.level === 2) {
		const { value } = props.children[0].props;
		titles.push(value);
		return (
			<h2 id={value} style={content.title}>
				{props.children}
			</h2>
		);
	}
	const Heading = ReactMarkdown.renderers.heading;
	return <Heading {...props} />;
};

const LinkComponent = (props: any) => {
	return (
		<a href={props.href} target="_blank" rel="noopener noreferrer">
			{props.children[0].props.value}
		</a>
	);
};

const ImageComponent = (props: any) => {
	const image = {
		src: props.src.replace(
			'auracloudapp.oss-cn-shenzhen.aliyuncs.com',
			'assets.auracloudapp.com'
		),
	};
	return (
		<a
			href={image.src}
			target="_blank"
			rel="noopener noreferrer"
			style={{ outline: 'none' }}
		>
			<img className="post-img" src={image.src} alt={props.title} />
		</a>
	);
};

const Post = (props: IProps) => {
	const { post } = props;

	// 防止因没有找到文章报错
	useEffect(() => {
		if (!post) Router.push({ pathname: '/' });
	});

	if (!post) return null;
	const childProps = { title: post.title }; // 传入 title 给 head 组件

	const deletePost = async () => {
		if (confirm('确认要删除吗？')) {
			const result = await blog.deletePost({ id: post.id });
			if (result.message === 'SUCCESS') {
				Router.push({ pathname: '/' });
			}
		}
	};

	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		const getUserInfo = async () => {
			const _userInfo = await request.getUserInfo();
			setUserInfo(_userInfo);
		};
		if (!userInfo) getUserInfo();
	});

	return (
		<React.Fragment>
			<Header {...childProps} />
			<div style={jumbotron.self}>
				<div style={jumbotron.cover}>
					<h2 style={jumbotron.title}>{post.title}</h2>
					<p style={jumbotron.description}>{post.description}</p>
					<span style={jumbotron.date}>
						由 <span style={jumbotron.name}>Jiajun Yan</span> 于
						{moment(post.createdAt).format('YYYY年M月DD日')}
						编写
						{post.updatedAt
							? `，于${moment(post.updatedAt).format('YYYY年M月DD日')}更新`
							: ''}
					</span>

					{userInfo ? (
						<ul style={control.options}>
							<li>
								<Link href={`/post/edit/[id]`} as={`/post/edit/${post.id}`}>
									<a style={control.edit}>修改</a>
								</Link>
							</li>
							<li>
								<span
									style={control.delete}
									key="delete-btn"
									onClick={deletePost}
								>
									删除
								</span>
							</li>
						</ul>
					) : null}
				</div>
			</div>
			<section style={content.self}>
				<article style={content.article} className="markdown">
					<ReactMarkdown
						source={post.body}
						renderers={{
							heading: HeadingComponent,
							code: CodeBlock,
							link: LinkComponent,
							image: ImageComponent,
						}}
					></ReactMarkdown>
				</article>
				<aside style={content.sidebar}>
					{titles.length ? (
						<React.Fragment>
							<h2 style={content.catalog}>目录</h2>
							<div style={content.sidebarWrapper} className="sidebar-scroll">
								{titles.map((title) => {
									return (
										<p key={title}>
											<a href={`#${title}`} style={content.sidebarTitle}>
												{title}
											</a>
										</p>
									);
								})}
							</div>
						</React.Fragment>
					) : (
						''
					)}
				</aside>
			</section>
			<style jsx global>{`
				article h1 {
					font-size: 46px;
					line-height: 72px;
					padding: 40px 0;
				}
				article h2 {
					font-size: 36px;
					line-height: 48px;
					padding: 40px 0;
				}
				article h3 {
					font-size: 32px;
					line-height: 42px;
					padding: 40px 0;
				}
				article h4 {
					font-size: 28px;
					line-height: 32px;
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
				article ul li ul,
				article ul li ol,
				article ol li ul,
				article ol li ol {
					padding-left: 20px;
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
				article pre code {
					font-size: 16px;
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
				@media screen and (max-width: ${layout.screen.mobile}px) {
					article h1 {
						font-size: 32px;
						line-height: 46px;
						padding: 30px 0;
					}
					article h2 {
						font-size: 28px;
						line-height: 40px;
						padding: 30px 0;
					}
					article h3 {
						font-size: 24px;
						line-height: 32px;
						padding: 30px 0;
					}
					article h4 {
						font-size: 22px;
						line-height: 26px;
						padding: 30px 0;
					}
					article h5 {
						font-size: 20px;
						line-height: 24px;
						padding: 30px 0;
					}
					article h6 {
						font-size: 20px;
						line-height: 28px;
						padding: 30px 0;
					}
					article ul,
					article ol {
						padding: 15px 0 30px;
					}
					article ul li,
					article ol li {
						font-size: 19px;
						line-height: 28px;
						margin: 0 20px;
					}
					article ul li ul,
					article ul li ol,
					article ol li ul,
					article ol li ol {
						padding-left: 0;
					}
					article p {
						font-size: 19px;
						line-height: 28px;
						padding-bottom: 10px;
					}
					article p strong {
						padding-bottom: 10px;
					}
					article p img {
						width: 100%;
					}
					article pre {
						margin-bottom: 20px !important;
					}
				}
			`}</style>
			<Footer />
		</React.Fragment>
	);
};

Post.getInitialProps = async (context: NextPageContext) => {
	const { id } = context.query;
	const post = await getSingleBlogPost(id);
	titles = [];
	return { post };
};

export default Radium(Post);
