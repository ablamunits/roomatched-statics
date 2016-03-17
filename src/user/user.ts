enum UserType {
	Visitor, Seeker, Offerer
}

interface IUser {
	email: string;
	type: UserType;
}

class User implements IUser {
	email: string;
	type: UserType;
	firstName: string;
	lastName: string;

	constructor(type: UserType = UserType.Visitor) {
		this.type = type;
	}
}
