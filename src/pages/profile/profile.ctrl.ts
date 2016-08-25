/// <reference path="../../../typings/tsd.d.ts" />

class ProfileController {
	cityOptions: string[] = ['Tel-Aviv', 'Beer-Sheva', 'Jerusalem', 'Haifa'];

	user: User;
	preferences: Preferences<PreferenceScore>;
	mostValuablePreferences: Preferences<boolean>;
	details: SeekerPreferences | OffererDetails;

	userSettings: UserSettings;
	apartmentDetails: Apartment;
	roomDetails: Room;

	openSettings = {
		preferences: false,
		settings: false,
		roomPost: false
	};

	isSuccessMessageVisible: boolean = false;

	userFriends: FBFriend[];

	constructor (private $scope, private AuthService, private PreferenceService, private UserSettingsService, private ApartmentService, private RoomService, private $state, private $timeout) {
		AuthService.onAuthComplete(() => {
			if (AuthService.userIsLoggedIn) {
				this.user = AuthService.loggedUser;
			} else {
				$state.go('home');
			}

			this.getUserFriends();
		});
	};

	openSetting(setting: string) {
		this.closeAllSettings();
		this.openSettings[setting] = true;
	}

	private getUserFriends() {
		FB.api('/me/friends', {fields: 'first_name,picture.width(500).height(500)'}, (response: any) => {
			this.userFriends = response.data.map(obj => {
				return {
					name: obj.first_name,
					picture: obj.picture.data.url
				};
			});

			this.$scope.$apply();
		});
	}

	private closeAllSettings(displaySuccessMessage: boolean = false) {
		angular.forEach(this.openSettings, (i, key) => {
			this.openSettings[key] = false;
		});

		if (displaySuccessMessage) {
			this.isSuccessMessageVisible = true;
			this.$timeout(() => {
				this.isSuccessMessageVisible = false;
			}, 3000);
		}
	}

	showPreferenceSelector() {
		if (this.openSettings.preferences) {
			this.closeAllSettings();
			return;
		}

		this.openSetting('preferences');
		this.PreferenceService.getUserPreference(this.user.id, this.user.type).then((detailedPreferences) => {
			console.log(detailedPreferences);
			this.preferences = detailedPreferences.preferences;
			this.mostValuablePreferences = detailedPreferences.mostValuablePreferences;
			this.details = detailedPreferences.additionalDetails;
		});
	};

	updatePreferences() {
		this.PreferenceService.updateUserPreference(this.user.id, this.user.type, this.preferences, this.mostValuablePreferences, this.details).then(() => {
			this.closeAllSettings(true);
		});
	}

	showSettings() {
		if (this.openSettings.settings) {
			this.closeAllSettings();
			return;
		}

		this.openSetting('settings');
		this.UserSettingsService.getUserSettings(this.user.id).then((userSettings) => {
			this.userSettings = userSettings;
			console.log(this.userSettings);
		});
	};

	updateSettings() {
		this.UserSettingsService.updateUserSettings(this.user.id, this.userSettings).then(() => {
			this.closeAllSettings(true);
		});
	}

	showRoomOffering() {
		if (this.openSettings.roomPost) {
			this.closeAllSettings();
			return;
		}

		this.openSetting('roomPost');
		this.ApartmentService.getApartmentDetailsByOffererId(this.user.id).then((apartmentDetailsResponse) => {
			this.apartmentDetails = apartmentDetailsResponse.apartmentDetails;
			this.roomDetails = apartmentDetailsResponse.roomDetails;
		});
	}

	updateRoomOffering() {
		this.ApartmentService.updateApartment(this.apartmentDetails.apartmentId, this.apartmentDetails).then(() => {
			this.RoomService.updateRoom(this.roomDetails.roomId, this.roomDetails).then(() => {
				this.closeAllSettings(true);
			});
		});
	}
};

roomatchedApp.controller('ProfileCtrl', ProfileController);
