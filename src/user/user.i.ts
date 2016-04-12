enum UserType {
	Visitor, Seeker, Offerer
}

interface IUser {
	id?: number;
	type: UserType;
	email: string;
	password?: string;
	firstName: string;
	lastName: string;
	sex: string;
	photoUrl?: string;
}
