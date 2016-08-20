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
		// this.AuthService.onAuthComplete(() => {
		// 	if (this.AuthService.userIsLoggedIn) {
		// 		this.$state.go('profile');
		// 	} else {
		// 		this.$state.go('home');
		// 	}
		// });
	}

	fbLogout() {
		this.AuthService.logout(() => {
			this.isLoggedIn = false;
			this.loggedUser = null;
			this.$state.go('home');
		});
	}
};

roomatchedApp.controller('LoginCtrl', LoginController);
