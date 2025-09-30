export type User_credentials = {
	email: string;
	password: string;
};

export type User_DB_Schema = User_credentials &
	default_schema & {
		name: string;
		lastLogin?: string | Date;
		phone?: string;
		role: "user" | "admin";
	};

export type default_schema = {
	id: string;
	createdAt: string | Date;
	updatedAt: string | Date;
};
