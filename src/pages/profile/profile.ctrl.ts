/// <reference path="../../../typings/tsd.d.ts" />

class ProfileController {
	user: User;
	preferences: Preferences;
	details: SeekerPreferences | OffererDetails;

	isPreferenceEditVisible: boolean = false;
	isDetailEditVisible: boolean = false;

	constructor (private $scope, private AuthService, private PreferenceService, private $state) {
		AuthService.onAuthComplete(() => {
			if (AuthService.userIsLoggedIn) {
				this.user = AuthService.loggedUser;
			} else {
				$state.go('home');
			}
		});
	};

	showPreferenceSelector() {
		this.PreferenceService.getUserPreference(this.user.id, this.user.type).then(detailedPreferences => {
			this.preferences = detailedPreferences.preferences;
			this.details = detailedPreferences.additionalDetails;
		});
	}
};

roomatchedApp.controller('ProfileCtrl', ProfileController);
