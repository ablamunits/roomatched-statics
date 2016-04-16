interface Apartment {
	size: number;
	location: string;
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
	images?: string[];
}
