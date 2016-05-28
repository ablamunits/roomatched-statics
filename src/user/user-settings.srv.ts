class UserSettingsServiceProvider {
	constructor(private $http: ng.IHttpService){
	}

	getUserSettings(id: number) {
		return this.$http.get(API_URI + '/settings/' + id).then(response => {
			return response.data;
		});
	}
}

roomatchedApp.service('UserSettingsService', UserSettingsServiceProvider);
