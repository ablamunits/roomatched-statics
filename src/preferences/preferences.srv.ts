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

	private getOffererPreference(userId: number): ng.IPromise<any> {
		let preferences: Preferences;
		let additionalDetails: OffererDetails;

		return this.$http.get(API_URI + `/offererPref/${userId}`).then((response) => {
			preferences = <Preferences>response.data;
			return { preferences: preferences };
		});
	}

	private getSeekerPreference(userId: number): ng.IPromise<any> {
		let preferences: Preferences;
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
}

roomatchedApp.service('PreferenceService', PreferencesServiceProvider);
