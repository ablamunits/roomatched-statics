/// <reference path="../../../typings/tsd.d.ts" />

class ProfileController {
	private user: User;
	constructor (private AuthService) {
		// todo
		this.user = AuthService.loggedUser;
	}
};

roomatchedApp.controller('ProfileCtrl', ProfileController);
