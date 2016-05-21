class UserServiceProvider {
	constructor(private $http: ng.IHttpService){
	}

	registerUser (user: User, preferences: Preferences, additionalInfo: Object) {
		let newUserRegistrationObject = {
			email: user.email,
			facebookId: user.facebookId,
			password: user.password,
			firstName: user.firstName,
			lastName: user.lastName,
			sex: user.sex,
			type: this.typeToString(user.type),
			photoUrl: user.photoUrl || '',
			preferences: preferences,
			additionalDetails: additionalInfo
		};

		console.log(newUserRegistrationObject);

		return this.$http.post(API_URI + '/user', newUserRegistrationObject);
	}

	typeToString(type: UserType): string {
		if (type === UserType.Visitor) {
			return 'VISITOR';
		} else if (type === UserType.Seeker) {
			return 'SEEKER';
		} else if (type === UserType.Offerer) {
			return 'OFFERER';
		} else {
			throw 'Invalid user type encountered';
		}
	}
}

roomatchedApp.service('UserService', UserServiceProvider);
