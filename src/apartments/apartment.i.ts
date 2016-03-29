interface IApartment {
	size: number;
	location: string;
	totalRooms: number;
	totalRoomates: number;
	freeRooms: number;
	floor: number;
	hasElevator: boolean;
	hasParking: boolean;
	isRenovated: boolean;
	isFurnished: boolean;
	approximateExpences?: number;
	images?: string[];
}
