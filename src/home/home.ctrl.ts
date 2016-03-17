/// <reference path="../../typings/tsd.d.ts" />

class HomeController {
	showSeekerRegistration: boolean = false;
	showOffererRegistration: boolean = false;
	user: IUser;

	constructor (private $scope: ng.IScope) {
		this.user = new User();
	}

	openSeekerRegister() {
		this.showSeekerRegistration = true;
	}

	openOffererRegister() {
		this.showOffererRegistration = true;
	}

	private registerAsSeeker() {
		// TODO with User service
	}

	private registerAsOfferer() {
		// TODO with User service
	}
}

roomatchedApp.controller('HomeCtrl', HomeController);
