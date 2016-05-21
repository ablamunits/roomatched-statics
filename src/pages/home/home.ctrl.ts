/// <reference path="../../../typings/tsd.d.ts" />

class HomeController {
	isSeekerRegistration: boolean = false;
	isOffererRegistration: boolean = false;
	registrationHasErrors: boolean = false;

	cityOptions: string[] = ['Tel-Aviv', 'Beer-Sheva', 'Jerusalem', 'Haifa'];
	newUser: User;
	preferenceSelect: Preferences;

	seekerRegistrationFields = {
		fromPrice: 0,
		toPrice: 1000,
		preferedCity: null,
		preferedNumberOfRoomates: 2
	};

	offererApartmentDetails: Apartment;
	offererRoomDetails: Room;

	postList: Post[];

	constructor (private $scope: ng.IScope, private $http: ng.IHttpService, private UserService: UserServiceProvider, $stateParams, AuthService, PostService) {
		PostService.init().then((posts) => this.postList = posts);

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
