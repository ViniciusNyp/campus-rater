export type GetInstitutionsInput = {
	institution_id?: number;
	name_or_abbrev?: string;
	code?: number;
	rating_order?: 'asc' | 'desc';
	skip?: number;
	limit?: number;
};

export type Institution = {
	institution_id: number;
	name: string;
	abbrev: string;
	code: number;
	average_rating: number;
};
