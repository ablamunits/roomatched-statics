/// <reference path="../../../typings/tsd.d.ts" />

class ProfileController {
	user: User;
	preferences: Preferences;
	details: SeekerPreferences | OffererDetails;
	userSettings: UserSettings;

	apartmentDetails: Apartment;
	roomDetails: Room;

	constructor (private $scope, private AuthService, private PreferenceService, private UserSettingsService, private $state) {
		AuthService.onAuthComplete(() => {
			if (AuthService.userIsLoggedIn) {
				this.user = AuthService.loggedUser;
			} else {
				$state.go('home');
			}
		});
	};

	showPreferenceSelector() {
		this.PreferenceService.getUserPreference(this.user.id, this.user.type).then((detailedPreferences) => {
			this.preferences = detailedPreferences.preferences;
			this.details = detailedPreferences.additionalDetails;
		});
	};

	showSettings() {
		this.UserSettingsService.getUserSettings(this.user.id).then((userSettings) => {
			this.userSettings = userSettings;
			console.log(this.userSettings);
		});
	};

	showRoomOffering() {
		// TODO !!!
		this.ApartmentService.getApartmentDetailsByOffererId(this.user.id).then((apartmentDetailsResponse) => {
			this.apartmentDetails = apartmentDetailsResponse.apartmentDetails;
			this.roomDetails = apartmentDetailsResponse.roomDetails;
		});
	}
};

roomatchedApp.controller('ProfileCtrl', ProfileController);
