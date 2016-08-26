class PreferencesServiceProvider {
	constructor(private $http: ng.IHttpService){
	}

	getUserPreference(id: number, type: UserType) {
		if (type === UserType.Seeker) {
			return this.getSeekerPreference(id);
		} else if (type === UserType.Offerer) {
			return this.getOffererPreference(id);
		} else {
			console.error('Unmatching preference type in PreferenceServiceProvider');
			console.log(type);
		}
	}

	updateUserPreference(id: number, type: UserType, preferences: Preferences<PreferenceScore>, mostValuablePreferences: Preferences<boolean>, details?: any) {
		if (type === UserType.Offerer) {
			return this.updateOffererPreference(id, preferences, mostValuablePreferences, details);
		} else if (type === UserType.Seeker) {
			return this.updateSeekerPreference(id, preferences, mostValuablePreferences, details);
		}
	}

	private getOffererPreference(userId: number): ng.IPromise<any> {
		let preferences: Preferences<PreferenceScore>;
		let mostValuablePreferences: Preferences<boolean>;
		let additionalDetails: OffererDetails;

		return this.$http.get(API_URI + `/offererPref/${userId}`).then((response: any) => {
			let rawPreferences = response.data.preferences;
			let mostValuablePreferences = response.data.mostValuablePreferences;

			preferences = {
				smoking: rawPreferences.smoking,
				animals: rawPreferences.animals,
				gayFriendly: rawPreferences.gayFriendly,
				sharedExpences: rawPreferences.sharedExpences,
				musicianFriendly: rawPreferences.musicianFriendly,
				kosher: rawPreferences.kosher || 0,
				vegan: rawPreferences.vegan,
				nightLife: rawPreferences.nightLife
			};

			let additionalDetails = {
				sexPreffered: rawPreferences.sexPreffered
			};

			return {
				preferences: preferences,
				mostValuablePreferences: mostValuablePreferences,
				additionalDetails: additionalDetails
			};
		});
	}

	private updateOffererPreference(userId: number, preferences: Preferences<PreferenceScore>, mostValuablePreferences: Preferences<boolean>, details: any): ng.IPromise<any> {
		let rawPreferenceObject = {
			preferences: preferences,
			additionalDetails: details,
			mostValuablePreferences: mostValuablePreferences
		};

		return this.$http.post(API_URI + `/offererPref/${userId}`, rawPreferenceObject).then((response) => {
			console.log('Updated offerer pref.');
		});
	}

	private getSeekerPreference(userId: number): ng.IPromise<any> {
		let preferences: Preferences<PreferenceScore>;
		let mostValuablePreferences: Preferences<boolean>;
		let additionalDetails: SeekerPreferences;

		return this.$http.get(API_URI + `/seekerPref/${userId}`).then((response: any) => {
			let rawPreferences = response.data.preferences;
			mostValuablePreferences = response.data.mostValuablePreferences;

			preferences = {
				smoking: rawPreferences.smoking,
				animals: rawPreferences.animals,
				gayFriendly: rawPreferences.gayFriendly,
				sharedExpences: rawPreferences.sharedExpences,
				musicianFriendly: rawPreferences.musicianFriendly,
				kosher: rawPreferences.kosher || 0,
				vegan: rawPreferences.vegan,
				nightLife: rawPreferences.nightLife
			};

			additionalDetails = {
				fromPrice: rawPreferences.minPricePreffered,
				toPrice: rawPreferences.maxPricePreffered,
				city: rawPreferences.city,
				numberOfRoomates: rawPreferences.numberOfRoomates
			};

			return {
				preferences: preferences,
				mostValuablePreferences: mostValuablePreferences,
				additionalDetails: additionalDetails
			};
		});
	}

	private updateSeekerPreference(userId: number, preferences: Preferences<PreferenceScore>, mostValuablePreferences: Preferences<boolean>, seekerPref: SeekerPreferences) {
		let seekerPrefObject = {
				minPricePreffered: seekerPref.fromPrice,
				maxPricePreffered: seekerPref.toPrice,
				numberOfRoomates: seekerPref.numberOfRoomates,
				city: seekerPref.city,
				address: null,
				seekerOccupation: null,
		};

		let rawPreferenceObject = {
			preferences: preferences,
			additionalDetails: seekerPrefObject,
			mostValuablePreferences: mostValuablePreferences
		};

		return this.$http.post(API_URI + `/seekerPref/${userId}`, rawPreferenceObject).then((response) => {
			console.log('Updated seeker pref.');
		});
	}
}

roomatchedApp.service('PreferenceService', PreferencesServiceProvider);
