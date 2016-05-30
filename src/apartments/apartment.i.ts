interface Apartment {
	apartmentId?: number;
	id?: number;
	size: number;
	city: string;
	address: string;
	totalRooms: number;
	totalRoomates: number;
	freeRooms: number;
	floor: number;
	hasElevator: boolean;
	hasParking: boolean;
	hasLivingRoom: boolean;
	isRenovated: boolean;
	isFurnished: boolean;
	guarantees: string;
	approximateExpences?: number;
	// images?: string[];
	images?: string;
}
