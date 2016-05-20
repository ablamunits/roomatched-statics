/// <reference path="../../../typings/tsd.d.ts" />

class ProfileController {
	private user: User;
	constructor (private AuthService) {
		this.user = AuthService.loggedUser;
	}
};

roomatchedApp.controller('ProfileCtrl', ProfileController);
