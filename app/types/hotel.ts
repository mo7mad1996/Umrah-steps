export interface IHotelRequest {
	name: { ar: string; en: string };
	description: { ar: string; en: string };
	content: { ar: string; en: string };
	status: string;
	price: number;
	location: {
		city: { ar: string; en: string };
		address: { ar: string; en: string };
	};
	amenities: string[];
	img?: string;
	images?: string[];
	rate: number;
}

export interface IHotelResponse {
	id: string;
	name: string;
	description: string;
	price: number;
	content: string;
	location: { address: string; city: string };
	img: string;
	images: string[];
	status: string;
	rate: number;
	amenities: IAmenity[];
	createdAt: Date;
	updatedAt: Date;
}
export interface IHotelResponseWithMultiLang {
	id: string;
	name: { ar: string; en: string };
	description: { ar: string; en: string };
	content: { ar: string; en: string };
	location: {
		city: { ar: string; en: string };
		address: { ar: string; en: string };
	};
	img: string;
	images: string[];
	rate: number;
	status: string;
	price: number;
	amenities: IAmenity[];
	createdAt: Date;
	updatedAt: Date;

	lang: (lang: "ar" | "en") => IHotelResponse;
}

export interface IHotelListResponse {
	data: Omit<IHotelResponseWithMultiLang, "lang">[] | IHotelResponse[];
	count: number;
}

export interface IAmenity {
	id: string;
	ar: string;
	en: string;
	icon: string;
}
