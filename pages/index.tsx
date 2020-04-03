import React from 'react';
import Radium from 'radium';
import Link from 'next/link';
import Router from 'next/router';
import { NextPageContext } from 'next';
import { IProps, IMonthData, ITag, IPost } from '../interfaces/home.interfaces';
import { theme, layout } from '../styles';
import Header from '../components/Header';
import api from '../api';
import moment from 'moment';
import Footer from '../components/Footer';

const { blog } = api;
const { colors, fontWeight } = theme;

const jumbotron = {
	self: {
		width: '100%',
		height: 500,
		backgroundColor: colors.gray,
		backgroundImage: `url(https://assets.auracloudapp.com/img/hero.jpg)`,
		backgroundSize: 'cover',
		display: 'flex',
		position: 'relative' as 'relative',
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			height: 300
		}
	},
	cover: {
		position: 'absolute' as 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0.1)',
		zIndex: 0
	},
	titleWrapper: {
		position: 'relative' as 'relative',
		alignSelf: 'flex-end',
		zIndex: 1,
		...layout.contentSize.desktop,
		margin: '0 auto 100px',
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			margin: '0 auto 50px'
		}
	},
	title: {
		fontSize: 80,
		color: colors.white,
		fontWeight: fontWeight.ultra,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			fontSize: 56,
			textAlign: 'center'
		}
	}
};

const content = {
	self: {
		padding: '200px 0',
		...layout.contentSize.desktop,
		...layout.alignCenter,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			padding: '60px 0'
		}
	},
	tagTitle: {
		fontSize: 30,
		paddingBottom: 40,
		color: colors.gray,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			fontSize: 20,
			paddingBottom: 20
		}
	},
	wrapper: {
		display: 'flex'
	}
};

const posts = {
	self: {
		width: '70%',
		paddingRight: 20,
		boxSizing: 'border-box' as 'border-box',
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			width: '100%',
			paddingRight: 0
		}
	},
	data: {
		paddingTop: 100,
		width: '95%',
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			width: '100%',
			paddingTop: 50
		}
	},
	dataFirstChild: {
		paddingTop: 0,
		width: '95%',
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			width: '100%'
		}
	},
	month: {
		display: 'block',
		color: colors.gray,
		fontSize: 22,
		paddingBottom: 20,
		[`@media screen and (max-width: ${layout.screen.desktop}px)`]: {
			fontSize: 18
		},
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			fontSize: 14,
			paddingBottom: 10
		}
	},
	titleWrapper: {
		display: 'block',
		textDecoration: 'none',
		cursor: 'auto',
		outline: 'none'
	},
	title: {
		fontSize: 60,
		lineHeight: '72px',
		fontWeight: fontWeight.extraBold,
		color: colors.white,
		textDecoration: 'none',
		cursor: 'pointer',
		[`@media screen and (max-width: ${layout.screen.desktop}px)`]: {
			fontSize: 50,
			lineHeight: '64px'
		},
		[`@media screen and (min-width: ${layout.screen.laptop}px)`]: {
			':hover': {
				textDecoration: 'underline'
			}
		},
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			fontSize: 35,
			lineHeight: '44px'
		}
	},
	description: {
		display: 'block',
		fontSize: 22,
		lineHeight: '28px',
		color: colors.semiGray,
		paddingBottom: 20,
		[`@media screen and (max-width: ${layout.screen.desktop}px)`]: {
			fontSize: 18,
			lineHeight: '24px'
		},
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			fontSize: 16,
			lineHeight: '22px',
			paddingBottom: 10
		}
	}
};

const tags = {
	self: {
		width: '30%',
		position: 'relative' as 'relative',
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			display: 'none'
		}
	},
	wrapper: {
		position: 'sticky' as 'sticky',
		top: 150
	},
	title: {
		fontSize: 22,
		marginBottom: 20,
		color: colors.gray,
		fontWeight: fontWeight.normal,
		[`@media screen and (max-width: ${layout.screen.desktop}px)`]: {
			fontSize: 18
		}
	},
	tagWrapper: {
		display: 'block',
		paddingBottom: 10
	},
	tag: {
		fontSize: 30,
		fontWeight: fontWeight.bold,
		cursor: 'pointer',
		color: colors.gray,
		[`@media screen and (max-width: ${layout.screen.desktop}px)`]: {
			fontSize: 26
		},
		[`@media screen and (min-width: ${layout.screen.laptop}px)`]: {
			':hover': {
				textDecoration: 'underline',
				color: colors.white
			}
		}
	}
};

// 将文章列表按月分类
const mapMonth = (posts: []) => {
	let newPosts = [];
	posts.forEach((post: IPost) => {
		let index = -1;
		let alreadyExists = newPosts.some((newPost, j) => {
			if (post.month === newPost.month) {
				index = j;
				return true;
			}
		});
		if (!alreadyExists) {
			newPosts.push({
				month: post.month,
				data: [post]
			});
		} else {
			newPosts[index].data.push(post);
		}
	});
	return newPosts;
};

const getBlogPosts = async ({ type }) => {
	if (isNaN(type)) return [];
	const params = +type !== -1 ? { pageSize: 99999, type } : { pageSize: 99999 };
	const result = await blog.getPosts(params);
	const _posts = result.data.map((post: IPost) => {
		post.month = moment(post.createdAt).format('YYYY年M月');
		return post;
	});

	const posts = mapMonth(_posts);
	return posts;
};

const getBlogTags = async () => {
	const result = await blog.getTags();
	result.data.unshift({ name: '全部', type: -1 });
	const tags = result.data;
	return tags;
};

const getBlogTag = (tags: [{}], type: any) => {
	const result = tags.filter((tag: ITag) => tag.type === +type);
	if (result.length) {
		return result[0];
	}

	return tags[0];
};

const getBlogPostsWithTag = (type: number) => {
	Router.push({ pathname: '/', query: { type } }); // 通过重定向本页面，刷新数据
	window.scrollTo(0, 440);
};

const Index = (props: IProps) => {
	let { type, tag } = props;
	const highlightTag = JSON.parse(JSON.stringify(tags.tag));
	highlightTag.color = type ? colors.white : colors.gray;

	return (
		<React.Fragment>
			<Header />
			<div style={jumbotron.self}>
				<div style={jumbotron.cover}></div>
				<div style={jumbotron.titleWrapper}>
					<h2 style={jumbotron.title}>Jiajun Yan</h2>
				</div>
			</div>

			<div style={content.self}>
				{tag.type !== -1 ? (
					<h2 style={content.tagTitle}>正在检索 {tag.name} 下的文章</h2>
				) : (
					''
				)}
				<div style={content.wrapper}>
					<ul style={posts.self}>
						{!props.posts.length ? (
							<h2 style={content.tagTitle}>暂无结果</h2>
						) : (
							''
						)}
						{props.posts.map((monthData: IMonthData, index) => {
							return (
								<li
									style={index === 0 ? posts.dataFirstChild : posts.data}
									key={monthData.month}
								>
									<span style={posts.month}>{monthData.month}</span>
									{monthData.data.map((post: IPost) => {
										return (
											<React.Fragment key={post.id}>
												<Link
													href="/post/[id]"
													as={`/post/${post.id}`}
													prefetch={false}
												>
													<a style={posts.titleWrapper}>
														<span style={posts.title} key={post.id}>
															{post.title}
														</span>
													</a>
												</Link>
												{post.description ? (
													<span style={posts.description}>
														{post.description}
													</span>
												) : (
													''
												)}
											</React.Fragment>
										);
									})}
								</li>
							);
						})}
					</ul>
					<div style={tags.self}>
						<ul style={tags.wrapper}>
							<h3 style={tags.title}>分类查询</h3>
							{props.tags.map((tag: ITag) => {
								return (
									<li key={tag.type} style={tags.tagWrapper}>
										<span
											key={tag.name}
											style={tag.type === +type ? highlightTag : tags.tag}
											onClick={() => getBlogPostsWithTag(tag.type)}
										>
											{tag.name}
										</span>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
			<Footer />
		</React.Fragment>
	);
};

Index.getInitialProps = async (context: NextPageContext) => {
	const { type = -1 } = context.query;

	const posts = await getBlogPosts({ type });
	const tags = await getBlogTags();
	const tag = getBlogTag(tags, type);

	return { posts, tags, type, tag };
};

export default Radium(Index);
