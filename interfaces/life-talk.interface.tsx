export interface IProps {
	posts: Array<IPost>;
}

export interface IPost {
	id: string;
	title: string;
	body: string;
	createdAt: string;
}
