class UserSettingsServiceProvider {
	constructor(private $http: ng.IHttpService){
	}

	getUserSettings(id: number) {
		return this.$http.get(API_URI + '/settings/' + id).then(response => {
			return response.data;
		});
	}

	updateUserSettings(id: number, settings: UserSettings) {
		return this.$http.post(API_URI + `/settings/${id}`, settings).then(response => {
			console.log('update settings ok?');
		});
	}
}

roomatchedApp.service('UserSettingsService', UserSettingsServiceProvider);
