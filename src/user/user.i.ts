enum UserType {
	Visitor, Seeker, Offerer
}

interface User {
	id?: number;
	facebookId?: string;
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
	city: string;
	numberOfRoomates: number;
}

interface OffererDetails {
	apartmentDetails: Apartment;
	roomDetails: Room;
}
