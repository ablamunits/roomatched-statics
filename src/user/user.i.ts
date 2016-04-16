enum UserType {
	Visitor, Seeker, Offerer
}

interface User {
	id?: number;
	type: UserType;
	email: string;
	password?: string;
	firstName: string;
	lastName: string;
	sex: string;
	photoUrl?: string;
}

interface SeekerPreferences {
	fromPrice: number;
	toPrice: number;
	location: string;
	numberOfRoomates: number;
}

interface OffererDetails {
	apartmentDetails: Apartment;
	roomDetails: Room;
}
