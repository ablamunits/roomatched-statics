/// <reference path="../../typings/tsd.d.ts" />

class LoginController {
	private loggedIn: boolean = true;
	private loggedUser: User;
	email: string;
	password: string;

	constructor (private $scope: ng.IScope, private AuthService: AuthServiceProvider) {
		AuthService.getAuthState().then((response) => {
			let data: any = response.data;
			this.loggedIn = data.loggedIn;

			if (this.loggedIn) {
					this.loggedUser.id = data.id;
					this.loggedUser.firstName = data.firstName;
					this.loggedUser.lastName = data.lastName;
					this.loggedUser.email = data.email;
			}
		}, (e) => { console.log(e); });
	}

	signIn() {
		this.AuthService.login(this.email, this.password).then((response) => {
			console.log(response);
		}, (e) => {
			console.log(e);
		});
	}

	signOut() {
		this.AuthService.logout();
	}

	isLoggedIn(): boolean {
		return this.loggedIn;
	}
};

roomatchedApp.controller('LoginCtrl', LoginController);
