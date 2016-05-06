/// <reference path="../../typings/tsd.d.ts" />

class AuthController {
	email: string;
	password: string;

	constructor (private $scope: ng.IScope, private AuthService: AuthServiceProvider) {

	}

	signIn() {
		this.AuthService.login(this.email, this.password);
	}
};

roomatchedApp.controller('AuthCtrl', AuthController);
