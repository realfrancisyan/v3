export interface IProps {
	post: IPost;
}

export interface IPost {
	id: string;
	title: string;
	body: string;
	createdAt: string;
	type: number;
	description?: string;
	updatedAt?: string;
}
