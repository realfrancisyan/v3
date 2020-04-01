export interface IProps {
	post: IPost;
}

export interface IPost {
	id: string;
	title: string;
	body: string;
	type: number;
	description: string;
}