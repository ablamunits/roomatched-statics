class AuthServiceProvider {
	userIsLoggedIn: boolean = false;
	loggedUser: User;

	constructor(private $http: ng.IHttpService){
		console.log('Authorization service constructor...');
	}

	login(email: string, password: string) {
		return this.$http.post(API_URI + '/auth/login', {email: email, password: password}).then((response) => {
			let data: any = response.data;

			if (true) { // if success
				this.userIsLoggedIn = true;
				this.loggedUser = {
					id: data.userId,
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					type: data.type,
					photoUrl: data.photoUrl,
					sex: data.sex
				};
			}
		}, (e) => {
			console.log(e);
			return null;
		}).then(() => {
			return this.loggedUser;
		});
	}


	logout() {
		return this.$http.post(API_URI + '/auth/logout', null).then((response) => {
			this.userIsLoggedIn = false;
			this.loggedUser = null;
		});
	}

	getAuthState() {
		return this.$http.get(API_URI + '/auth');
	}

	updateUserAuthentication() {
		return this.getAuthState().then((authResponse) => {
			let authData: any = authResponse.data;

			if (authData.loggedIn) {
				this.userIsLoggedIn = true;
				this.loggedUser = {
					id: authData.userId,
					firstName: authData.firstName,
					lastName: authData.lastName,
					email: authData.email,
					type: authData.type,
					photoUrl: authData.userPhoto,
					sex: authData.sex
				};
			}
		});
	}
}

roomatchedApp.service('AuthService', AuthServiceProvider);
