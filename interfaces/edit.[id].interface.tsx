export interface IProps {
	post: IPost;
	tags: Array<ITag>;
}

export interface IPost {
	id: string;
	title: string;
	body: string;
	type: number;
	description: string;
}

export interface ITag {
	name: string;
	type: number;
	createdAt: string;
}
