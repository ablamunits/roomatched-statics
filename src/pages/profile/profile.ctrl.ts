/// <reference path="../../../typings/tsd.d.ts" />

class ProfileController {
	user: User;
	preferences: Preferences;
	details: SeekerPreferences | OffererDetails;

	userSettings: UserSettings;
	apartmentDetails: Apartment;
	roomDetails: Room;

	openSettings = {
		preferences: false,
		settings: false,
		roomPost: false
	};

	constructor (private $scope, private AuthService, private PreferenceService, private UserSettingsService, private ApartmentService, private RoomService, private $state) {
		AuthService.onAuthComplete(() => {
			if (AuthService.userIsLoggedIn) {
				this.user = AuthService.loggedUser;
			} else {
				$state.go('home');
			}
		});
	};

	openSetting(setting: string) {
		this.closeAllSettings();
		this.openSettings[setting] = true;
	}

	private closeAllSettings() {
		angular.forEach(this.openSettings, (i, key) => {
			this.openSettings[key] = false;
		});
	}

	showPreferenceSelector() {
		this.openSetting('preferences');
		this.PreferenceService.getUserPreference(this.user.id, this.user.type).then((detailedPreferences) => {
			this.preferences = detailedPreferences.preferences;
			this.details = detailedPreferences.additionalDetails;
		});
	};

	updatePreferences() {
		this.PreferenceService.updateUserPreference(this.user.id, this.user.type, this.preferences, this.details).then(() => {
			console.log('update ok?');
		});
	}

	showSettings() {
		this.openSetting('settings');
		this.UserSettingsService.getUserSettings(this.user.id).then((userSettings) => {
			this.userSettings = userSettings;
			console.log(this.userSettings);
		});
	};

	updateSettings() {
		this.UserSettingsService.updateUserSettings(this.user.id, this.userSettings).then(() => {
			console.log('settings update ok?');
		});
	}

	showRoomOffering() {
		this.openSetting('roomPost');
		this.ApartmentService.getApartmentDetailsByOffererId(this.user.id).then((apartmentDetailsResponse) => {
			this.apartmentDetails = apartmentDetailsResponse.apartmentDetails;
			this.roomDetails = apartmentDetailsResponse.roomDetails;
		});
	}

	updateRoomOffering() {
		this.ApartmentService.updateApartment(this.apartmentDetails.apartmentId, this.apartmentDetails);
		this.RoomService.updateRoom(this.roomDetails.roomId, this.roomDetails);
	}
};

roomatchedApp.controller('ProfileCtrl', ProfileController);
