class UserServiceProvider {
	constructor(private $http: ng.IHttpService){
	}

	registerUser (user: User, preferences: Preferences, additionalInfo: Object) {
			let newUserRegistrationObject = {
				email: user.email,
				password: user.password,
				firstName: user.firstName,
				lastName: user.lastName,
				sex: user.sex || null,
				type: this.typeToString(user.type),
				photoUrl: user.photoUrl || null,
				preferences: preferences,
				additionalDetails: additionalInfo
			};

			console.log(newUserRegistrationObject);

			this.$http.post(API_URI + '/user', newUserRegistrationObject).then((response) => {
				console.log(response);
			});
	}

	private typeToString(type: UserType): string {
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
