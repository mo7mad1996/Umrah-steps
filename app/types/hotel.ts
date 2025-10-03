export interface IHotelRequest {
	name: { ar: string; en: string };
	description: { ar: string; en: string };
	content: { ar: string; en: string };
	location: { city: { ar: string; en: string } };
	img?: string;
	rate: number;
}

export interface IHotelResponse {
	id: string;
	name: string;
	description: string;
	content: string;
	location: { city: string };
	img: string;
	rate: number;
	createdAt: Date;
	updatedAt: Date;
}
export interface IHotelResponseWithMultiLang {
	id: string;
	name: { ar: string; en: string };
	description: { ar: string; en: string };
	content: { ar: string; en: string };
	location: { city: { ar: string; en: string } };
	img: string;
	rate: number;
	createdAt: Date;
	updatedAt: Date;

	lang: (lang: "ar" | "en") => IHotelResponse;
}

export interface IHotelListResponse {
	data: Omit<IHotelResponseWithMultiLang, "lang">[] | IHotelResponse[];
	count: number;
}
