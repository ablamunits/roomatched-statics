class UserServiceProvider {
	constructor(private $http: ng.IHttpService){
	}

	registerUser (user: User, preferences: Preferences, additionalInfo: Object) {
		let newUserRegistrationObject = {
			facebookId: user.facebookId,
			firstName: user.firstName,
			lastName: user.lastName,
			yearOfBirth: user.yearOfBirth,
			sex: user.sex,
			type: this.typeToString(user.type),
			photoUrl: user.photoUrl || '',
			preferences: preferences,
			additionalDetails: additionalInfo
		};

		console.log(newUserRegistrationObject);

		return this.$http.post(API_URI + '/user', newUserRegistrationObject);
	}

	getUserByFacebookId(id: number) {
		return this.$http.get(API_URI + '/user/fb/' + id);
	}

	getUserById(id: number) {
		return this.$http.get(API_URI + '/user/' + id).then(response => {
			return response.data;
		}, e => {
			console.log(e);
		});
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
