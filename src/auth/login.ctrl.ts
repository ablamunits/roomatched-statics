/// <reference path="../../typings/tsd.d.ts" />

class LoginController {
	isLoggedIn: boolean = true;
	loggedUser: User;
	email: string;
	password: string;

	constructor (private $scope: ng.IScope, private AuthService: AuthServiceProvider) {
		AuthService.getAuthState().then((response) => {
			let data: any = response.data;
			this.isLoggedIn = data.loggedIn;
			console.log(data);

			if (this.isLoggedIn) {
				this.loggedUser = {
					id: data.userId,
					firstName: data.firstName,
					lastName: data.lastName,
					email: null, // todo
					type: UserType.Seeker, // todo
					photoUrl: '', // todo
					sex: '', // todo
				};
				
					this.loggedUser.id = data.id;
					this.loggedUser.firstName = data.firstName;
					this.loggedUser.lastName = data.lastName;
					this.loggedUser.email = data.email;
			}

			console.log(this.loggedUser);
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
};

roomatchedApp.controller('LoginCtrl', LoginController);
