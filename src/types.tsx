export interface Address {
	id: string;
	postcode: string;
	line1: string;
	line2: string;
	line3: string;
	town: string;
	country: string;
}

export interface Addresses {
	"formatted_address": string[],
	"thoroughfare": string,
	"building_name": string,
	"sub_building_name": string,
	"sub_building_number": string,
	"building_number": string,
	"line_1": string,
	"line_2": string,
	"line_3": string,
	"line_4": string,
	"locality": string,
	"town_or_city": string,
	"county": string,
	"district": string,
	"country": string;
}

export interface Response {
	"postcode": string,
	"latitude": number,
	"longitude": number,
	"addresses": Addresses[];
}
