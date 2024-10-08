import { JWTPayload } from 'jose';

export type SignUpInput = {
	full_name: string;
	username: string;
	email: string;
	password: string;
};

export type UserData = {
	full_name: string;
	username: string;
	email: string;
	user_id: number;
};

export type TokenData = UserData & JWTPayload;

export type LoginInput = {
	username: string;
	password: string;
	scope?: string;
	grant_type?: unknown;
	client_id?: unknown;
	client_secret?: unknown;
};

export type LoginResponse = {
	access_token: string;
	type: string;
};
