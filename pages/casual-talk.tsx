import Radium from 'radium';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { theme, layout } from '../styles';
import ReactMarkdown from 'react-markdown';
import lifeTalk from '../api/casual-talk';
import { IProps } from '../interfaces/life-talk.interface';
import moment from 'moment';

const { colors } = theme;

const content = {
	self: {
		display: 'flex',
		flexDirection: 'column' as 'column',
		padding: '100px 0',
		width: '55%',
		...layout.alignCenter,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			...layout.contentSize.mobile,
		},
	},
	mainTitle: {
		fontSize: 50,
		marginTop: 40,
		color: colors.lightBlue,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			fontSize: 30,
		},
	},
	post: {
		padding: `40px 0 20px`,
		borderTop: `1px solid ${colors.lightGray}`,
	},
	title: {
		fontSize: 36,
		paddingBottom: 10,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			fontSize: 26,
		},
	},
	date: {
		display: 'block',
		fontSize: 20,
		paddingBottom: 40,
		color: colors.gray,
		[`@media screen and (max-width: ${layout.screen.mobile}px)`]: {
			fontSize: 16,
		},
	},
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

const getPosts = async () => {
	const posts = await lifeTalk.getPosts({ pageNo: 1, pageSize: 9999 });
	return posts.data;
};

const LifeTalk = (props: IProps) => {
	const headerProps = { title: '随意说' };
	const { posts } = props;

	return (
		<React.Fragment>
			<Header {...headerProps} />

			<article style={content.self}>
				<h2 style={content.mainTitle}>Casual Talk 随意说</h2>
				{posts.map((post) => {
					return (
						<div style={content.post} key={post.id}>
							<h3 style={content.title}>{post.title}</h3>
							<span style={content.date}>
								{moment(post.createdAt).format('YYYY年M月DD日')}
							</span>
							<ReactMarkdown
								source={post.body}
								renderers={{
									link: LinkComponent,
									image: ImageComponent,
								}}
							></ReactMarkdown>
						</div>
					);
				})}
			</article>

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
					width: 120%;
					margin: 20px auto;
					margin-left: -10%;
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
						margin-left: 0;
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

LifeTalk.getInitialProps = async () => {
	const posts = await getPosts();
	return { posts };
};

export default Radium(LifeTalk);
