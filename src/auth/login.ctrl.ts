/// <reference path="../../typings/tsd.d.ts" />

class LoginController {
	isLoggedIn: boolean = true;
	signInFormVisible: boolean = false;
	loggedUser: User;
	email: string;
	password: string;

	constructor (private $scope: ng.IScope, private $timeout, private $state, private AuthService: AuthServiceProvider) {
		AuthService.updateUserAuthentication().then(() => {
			this.updateLoggedUser();
		});
	}

	private updateLoggedUser() {
		if (this.AuthService.userIsLoggedIn) {
			this.isLoggedIn = true;
			this.loggedUser = this.AuthService.loggedUser;
		} else {
			this.isLoggedIn = false;
			this.loggedUser = null;
		}
	}

	signIn() {
		this.AuthService.login(this.email, this.password).then((loggedUser) => {
			if (loggedUser) {
				this.updateLoggedUser();
				this.$state.go('matches');
			} else {
				console.log('sign in failed');
			}
		});
	}

	signOut() {
		this.AuthService.logout().then(() => {
			this.updateLoggedUser();
			this.signInFormVisible = false;
			this.$state.go('home');
		});
	}
};

roomatchedApp.controller('LoginCtrl', LoginController);
