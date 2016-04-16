interface Room {
	id?: number;
	apartmentId?: number;
	price: number;
	size: number;
	isFurnished: boolean;
	hasBalcony: boolean;
	seperateBathroom: boolean;
	airConditioned: boolean;
	images?: string[];
}
