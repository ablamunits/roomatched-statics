enum UserType {
	Visitor, Seeker, Offerer
}

interface User {
	id?: number;
	facebookId?: string;
	type: UserType;
	firstName: string;
	lastName: string;
	sex: string;
	email?: string;
	yearOfBirth?: number;
	password?: string;
	photoUrl?: string;
	facebookFriends?: string[];
	about?: string;
}

interface SeekerPreferences {
	fromPrice: number;
	toPrice: number;
	city: string;
	numberOfRoomates: number;
}

interface OffererDetails {
	apartmentDetails?: Apartment;
	roomDetails?: Room;
	sexPreffered?: string;
}

interface UserAbout {
	about: string;
}
