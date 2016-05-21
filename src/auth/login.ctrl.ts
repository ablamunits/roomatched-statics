/// <reference path="../../typings/tsd.d.ts" />

class LoginController {
	isLoggedIn: boolean = false;
	signInFormVisible: boolean = false;
	loggedUser: User;

	constructor (private $scope: ng.IScope, private $timeout, private $state, private AuthService: AuthServiceProvider) {
		AuthService.onAuthComplete(() => {
			this.isLoggedIn = AuthService.userIsLoggedIn;
			this.loggedUser = AuthService.loggedUser;
		});
	}

	fbLogin() {
		this.AuthService.login();
		this.AuthService.onAuthComplete(() => {
			this.$state.go('profile');
		});
	}

	fbLogout() {
		this.AuthService.logout(() => {
			this.$state.go('home');
		});
	}
};

roomatchedApp.controller('LoginCtrl', LoginController);
