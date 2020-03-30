export interface IProps {
	posts: [];
	tags: [];
	type: number;
	tag: ITag;
}

export interface IMonthData {
	month: string;
	data: [];
}

export interface IPost {
	title: string;
	description?: string;
	type: number;
	createdAt: string;
	id: string;
	month?: string;
}

export interface ITag {
	name: string;
	createdAt: string;
	type: number;
}
