/// <reference path="../../../typings/tsd.d.ts" />

const NUM_OF_PREFERENCE_SCORES: number = 4;

class HomeController {
	showSeekerRegistration: boolean = false;
	showOffererRegistration: boolean = false;
	newUser: IUser;
	preferenceSelect: IPreferences;
	seekerRegistrationFields = {
		fromPrice: 0,
		toPrice: 1000,
		preferedLocation: null,
		preferedNumberOfRoomates: 2
	};

	offererApartmentDetails: IApartment;
	offererRoomDetails: IRoom;

	constructor (private $scope: ng.IScope) {
		this.preferenceSelect = {
			smoking: PreferenceScore.Neutral,
			kosher: PreferenceScore.Neutral,
			vegan: PreferenceScore.Neutral,
			sharedExpences: PreferenceScore.Neutral,
			animals: PreferenceScore.Neutral,
			gayFriendly: PreferenceScore.Neutral,
			musicianFriendly: PreferenceScore.Neutral
		};
	}

	openSeekerRegister() {
		this.showSeekerRegistration = true;
		this.showOffererRegistration = false;
	}

	openOffererRegister() {
		this.showOffererRegistration = true;
		this.showSeekerRegistration = false;
	};

	preferenceClick(preference: string) {
		this.preferenceSelect[preference] = (this.preferenceSelect[preference] + 1) % NUM_OF_PREFERENCE_SCORES;
	}

	private registerAsSeeker() {
		// TODO with User service
		// UserService.RegisterUser(this.user, UserType.Seeker, this.preferences);
	}

	private registerAsOfferer() {
		// TODO with User service
		// UserService.RegisterUser(this.user, UserType.Offerer, this.preferences);
	}
}

roomatchedApp.controller('HomeCtrl', HomeController);
