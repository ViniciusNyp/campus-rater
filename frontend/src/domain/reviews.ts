export type GetUserReviewsInput = {
	user_id?: number;
	skip?: number;
	limit?: number;
	time_order?: 'asc' | 'desc';
};

export type Review = {
	review_id: number;
	title: string;
	content: string;
	rating: number;
	private: boolean;
	user_id: number;
	institution_id: number;
	created_at: string;
	updated_at: string;
};

export type CreateReviewInput = {
	user_id: number;
	title: string;
	content: string;
	rating: number;
	institution_id: number;
	private?: boolean;
};
