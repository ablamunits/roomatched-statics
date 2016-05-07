/// <reference path="../../typings/tsd.d.ts" />

class LoginController {
	isLoggedIn: boolean = true;
	loggedUser: User;
	email: string;
	password: string;

	constructor (private $scope: ng.IScope, private $state, private AuthService: AuthServiceProvider) {
		AuthService.getAuthState().then((response) => {
			let data: any = response.data;
			this.isLoggedIn = data.loggedIn;

			if (this.isLoggedIn) {
				this.loggedUser = {
					id: data.userId,
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					type: UserType.Seeker, // todo
					photoUrl: data.userPhoto,
					sex: data.sex
				};
			}

			console.log(this.loggedUser);
		}, (e) => { console.log(e); });
	}

	signIn() {
		this.AuthService.login(this.email, this.password).then((response) => {
			if (true) { // if success
				this.isLoggedIn = true;
			}
		}, (e) => {
			console.log(e);
		});
	}

	signOut() {
		this.AuthService.logout();
	}
};

roomatchedApp.controller('LoginCtrl', LoginController);
