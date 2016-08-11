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

	updateUserPreference(id: number, type: UserType, preferences: Preferences<PreferenceScore>, details?: any) {
		if (type === UserType.Offerer) {
			return this.updateOffererPreference(id, preferences, details);
		} else if (type === UserType.Seeker) {
			return this.updateSeekerPreference(id, preferences, details);
		}
	}

	private getOffererPreference(userId: number): ng.IPromise<any> {
		let preferences: Preferences<PreferenceScore>;
		let additionalDetails: OffererDetails;

		return this.$http.get(API_URI + `/offererPref/${userId}`).then((response) => {
			// preferences = <Preferences>response.data;
			let data = response.data as any;

			preferences = {
				smoking: data.smoking,
				animals: data.animals,
				gayFriendly: data.gayFriendly,
				sharedExpences: data.sharedExpences,
				musicianFriendly: data.musicianFriendly,
				kosher: data.kosher || 0,
				vegan: data.vegan
			};

			let additionalDetails = {
				sexPreffered: data.sexPreffered
			};

			return {
				preferences: preferences,
				additionalDetails: additionalDetails
			};
		});
	}

	private updateOffererPreference(userId: number, preferences: Preferences<PreferenceScore>, details: any): ng.IPromise<any> {
		preferences = angular.extend(preferences, details);
		return this.$http.post(API_URI + `/offererPref/${userId}`, preferences).then((response) => {
			console.log('Updated offerer pref.');
		});
	}

	private getSeekerPreference(userId: number): ng.IPromise<any> {
		let preferences: Preferences<PreferenceScore>;
		let additionalDetails: SeekerPreferences;

		return this.$http.get(API_URI + `/seekerPref/${userId}`).then((response) => {
			let data = <any>response.data;

			preferences = {
				smoking: data.smoking,
				animals: data.animals,
				gayFriendly: data.gayFriendly,
				sharedExpences: data.sharedExpences,
				musicianFriendly: data.musicianFriendly,
				kosher: data.kosher || 0,
				vegan: data.vegan
			};

			additionalDetails = {
				fromPrice: data.minPricePreffered,
				toPrice: data.maxPricePreffered,
				city: data.city,
				numberOfRoomates: data.numberOfRoomates
			};

			return {
				preferences: preferences,
				additionalDetails: additionalDetails
			};
		});
	}

	private updateSeekerPreference(userId: number, preferences: Preferences<PreferenceScore>, seekerPref: SeekerPreferences) {
		let seekerPrefObject = {
				minPricePreffered: seekerPref.fromPrice,
				maxPricePreffered: seekerPref.toPrice,
				numberOfRoomates: seekerPref.numberOfRoomates,
				city: seekerPref.city,
				address: null,
				seekerOccupation: null
		};

		seekerPrefObject = angular.extend(seekerPrefObject, preferences);
		console.log(seekerPrefObject);

		return this.$http.post(API_URI + `/seekerPref/${userId}`, seekerPrefObject).then((response) => {
			console.log('Updated seeker pref.');
		});
	}
}

roomatchedApp.service('PreferenceService', PreferencesServiceProvider);
