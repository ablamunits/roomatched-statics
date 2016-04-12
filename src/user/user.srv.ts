class UserServiceProvider {
	constructor(private $http: ng.IHttpService){
	}

	registerUser (user: IUser, type: UserType, pref: IPreferences) {
		let newUserRegistrationObject = {
			email: user.email,
			password: user.password,
			firstName: user.firstName,
			lastName: user.lastName,
			sex: user.sex || null,
			type: this.typeToString(type),
			photoUrl: user.photoUrl || null
		};

		console.log('Will try to register: ', newUserRegistrationObject);
		console.log('And after that add: ', pref);

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
