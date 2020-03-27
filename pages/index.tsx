import React from 'react';
import Radium from 'radium';
import Link from 'next/link';
import { theme, layout } from '../styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroBackground from '../assets/images/hero.jpg';
import api from '../api';
import moment from 'moment';

const { blog } = api;
const { colors, fontWeight } = theme;

const jumbotron = {
	self: {
		width: '100%',
		height: 500,
		backgroundColor: colors.gray,
		backgroundImage: `url(${HeroBackground})`,
		backgroundSize: 'cover',
		display: 'flex',
		position: 'relative' as 'relative'
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
		margin: '0 auto 100px'
	},
	title: {
		fontSize: 80,
		color: colors.white,
		fontWeight: fontWeight.ultra
	}
};

const content = {
	self: {
		...layout.contentSize.desktop,
		...layout.alignCenter,
		padding: '200px 0',
		display: 'flex'
	}
};

const posts = {
	self: {
		width: '70%',
		paddingRight: 20,
		boxSizing: 'border-box' as 'border-box'
	},
	data: {
		paddingTop: 100,
		width: '95%'
	},
	dataFirstChild: {
		paddingTop: 0,
		width: '95%'
	},
	month: {
		display: 'block',
		color: colors.gray,
		fontSize: 22,
		paddingBottom: 20
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
		':hover': {
			textDecoration: 'underline'
		}
	}
};

const tags = {
	self: {
		width: '30%',
		position: 'relative' as 'relative'
	},
	wrapper: {
		position: 'sticky' as 'sticky',
		top: 150
	},
	title: {
		fontSize: 22,
		marginBottom: 20,
		color: colors.gray,
		fontWeight: fontWeight.normal
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
		':hover': {
			textDecoration: 'underline',
			color: colors.white
		}
	}
};

interface IProps {
	posts: [];
	tags: [];
}

interface IMonthData {
	month: string;
	data: [];
}

interface IPost {
	title: string;
	type: number;
	createdAt: string;
	id: string;
	month?: string;
}

interface ITag {
	name: string;
	createdAt: string;
	type: number;
}

// 将文章列表按月分类
const mapMonth = function(posts) {
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

const getBlogPosts = async () => {
	const result = await blog.getPosts({ pageSize: 99999 });
	const _posts = result.data.map((post: IPost) => {
		post.month = moment(post.createdAt).format('YYYY年M月');
		return post;
	});

	const posts = mapMonth(_posts);
	return posts;
};

const getBlogTags = async () => {
	const result = await blog.getTags();
	const tags = result.data;
	return tags;
};

class Index extends React.Component<IProps> {
	constructor(props: any) {
		super(props);
	}
	static async getInitialProps() {
		const posts = await getBlogPosts();
		const tags = await getBlogTags();

		return { posts, tags };
	}
	render() {
		return (
			<React.Fragment>
				<Header></Header>
				<div style={jumbotron.self}>
					<div style={jumbotron.cover}></div>
					<div style={jumbotron.titleWrapper}>
						<h2 style={jumbotron.title}>Jiajun Yan</h2>
					</div>
				</div>
				<div style={content.self}>
					<ul style={posts.self}>
						{this.props.posts.map((monthData: IMonthData, index) => {
							return (
								<li
									style={index === 0 ? posts.dataFirstChild : posts.data}
									key={monthData.month}
								>
									<span style={posts.month}>{monthData.month}</span>
									{monthData.data.map((post: IPost) => {
										return (
											<Link href="/" key={post.id}>
												<a style={posts.titleWrapper}>
													<span style={posts.title} key={post.id}>
														{post.title}
													</span>
												</a>
											</Link>
										);
									})}
								</li>
							);
						})}
					</ul>
					<div style={tags.self}>
						<ul style={tags.wrapper}>
							<h3 style={tags.title}>分类查询</h3>
							{this.props.tags.map((tag: ITag) => {
								return (
									<li key={tag.type} style={tags.tagWrapper}>
										<span key={tag.name} style={tags.tag}>
											{tag.name}
										</span>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

export default Radium(Index);
