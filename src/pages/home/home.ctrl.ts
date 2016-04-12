/// <reference path="../../../typings/tsd.d.ts" />

class HomeController {
	isSeekerRegistration: boolean = false;
	isOffererRegistration: boolean = false;
	newUser: IUser;
	preferenceSelect: IPreferences;
	preferenceTitles = {
		smoking: "Smoking",
		kosher: "Kosher",
		vegan: "Vegan",
		sharedExpences: "Shared Expences",
		animals: "Animal Friendly",
		gayFriendly: "Gay Friendly",
		musicianFriendly: "Musician Friendly"
	}

	seekerRegistrationFields = {
		fromPrice: 0,
		toPrice: 1000,
		preferedLocation: null,
		preferedNumberOfRoomates: 2
	};

	offererApartmentDetails: IApartment;
	offererRoomDetails: IRoom;

	constructor (private $scope: ng.IScope, private $http: ng.IHttpService, private UserService) {
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
		this.isSeekerRegistration = true;
		this.isOffererRegistration = false;
	}

	openOffererRegister() {
		this.isOffererRegistration = true;
		this.isSeekerRegistration = false;
	};

	preferenceClick(preference: string) {
		this.preferenceSelect[preference] = (this.preferenceSelect[preference] + 1) % NUM_OF_PREFERENCE_SCORES;
	}

	registerButtonClick() {
		if (this.isSeekerRegistration) {
			this.registerAsSeeker();
		} else if (this.isOffererRegistration) {
			this.registerAsOfferer();
		}
	}

	private registerAsSeeker() {
		this.UserService.registerUser(this.newUser, UserType.Seeker, this.preferenceSelect);
	}

	private registerAsOfferer() {
		this.UserService.registerUser(this.newUser, UserType.Offerer, this.preferenceSelect);
	}
};

roomatchedApp.controller('HomeCtrl', HomeController);
