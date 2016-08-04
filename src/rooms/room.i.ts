interface Room {
	roomId?: number;
	id?: number;
	apartmentId?: number;
	price: number;
	size: number;
	hasBalcony: boolean;
	airConditioned: boolean;
	seperateBathroom: boolean;
	isFurnished: boolean;
	// images?: string[];
	photoUrl?: string;
}
