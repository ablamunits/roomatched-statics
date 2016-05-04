/// <reference path="../../../typings/tsd.d.ts" />

class HomeController {
	isSeekerRegistration: boolean = false;
	isOffererRegistration: boolean = false;
	registrationHasErrors: boolean = false;

	cityOptions: string[] = ['Tel-Aviv', 'Beer-Sheva', 'Jerusalem', 'Haifa'];
	newUser: User;
	preferenceSelect: Preferences;
	preferenceTitles = {
		smoking: 'Smoking',
		kosher: 'Kosher',
		vegan: 'Vegan',
		sharedExpences: 'Shared Expences',
		animals: 'Animal Friendly',
		gayFriendly: 'Gay Friendly',
		musicianFriendly: 'Musician Friendly'
	};
	preferenceIcons = {
		smoking: 'fa-search',
		kosher: 'fa-cutlery',
		vegan: 'fa-envira',
		sharedExpences: 'fa-money',
		animals: 'fa-paw',
		gayFriendly: 'fa-venus-mars',
		musicianFriendly: 'fa-headphones'
	};

	seekerRegistrationFields = {
		fromPrice: 0,
		toPrice: 1000,
		preferedCity: null,
		preferedNumberOfRoomates: 2
	};

	offererApartmentDetails: Apartment;
	offererRoomDetails: Room;

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
		let seekerPreferences = {
			pricePreffered: this.seekerRegistrationFields.toPrice,
			numberOfRoomates: this.seekerRegistrationFields.preferedNumberOfRoomates,
			city: this.seekerRegistrationFields.preferedCity
		};

		this.newUser.type = UserType.Seeker;

		this.UserService.registerUser(this.newUser, this.preferenceSelect, seekerPreferences).then((response) => {
			this.registrationHasErrors = false;
		}, (e) => {
			this.registrationHasErrors = true;
		});
	}

	private registerAsOfferer() {
		let offererDetails = {
			roomDetails: this.offererRoomDetails,
			apartmentDetails: this.offererApartmentDetails
		};

		this.newUser.type = UserType.Offerer;

		this.UserService.registerUser(this.newUser, this.preferenceSelect, offererDetails).then((response) => {
			this.registrationHasErrors = false;
		}, (e) => {
			this.registrationHasErrors = true;
		});
	}
};

roomatchedApp.controller('HomeCtrl', HomeController);
