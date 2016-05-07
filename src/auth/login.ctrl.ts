/// <reference path="../../typings/tsd.d.ts" />

class LoginController {
	isLoggedIn: boolean = true;
	signInFormVisible: boolean = false;
	loggedUser: User;
	email: string;
	password: string;

	constructor (private $scope: ng.IScope, private $state, private AuthService: AuthServiceProvider) {
		this.updateLoggedUser();
	}

	private updateLoggedUser() {
		this.AuthService.getAuthState().then((response) => {
			let data: any = response.data;

			if (data.loggedIn === false) {
				this.isLoggedIn = false;
				this.loggedUser = null;
				return;
			}

			this.loggedUser = {
				id: data.userId,
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				type: UserType.Seeker, // todo
				photoUrl: data.userPhoto,
				sex: data.sex
			};
		});
	}

	signIn() {
		this.AuthService.login(this.email, this.password).then((response) => {
			if (true) { // if success
				this.isLoggedIn = true;
				this.updateLoggedUser();
				this.$state.go('matches');
			}
		}, (e) => {
			console.log(e);
		});
	}

	signOut() {
		this.AuthService.logout();
		this.updateLoggedUser();
		this.$state.go('home');
	}
};

roomatchedApp.controller('LoginCtrl', LoginController);
