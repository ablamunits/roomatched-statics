enum UserType {
	Visitor, Seeker, Offerer
}

interface IUser {
	id?: number;
	type: UserType;
	email: string;
	firstName: string;
	lastName: string;
}
