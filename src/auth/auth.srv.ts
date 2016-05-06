class AuthServiceProvider {
	constructor(private $http: ng.IHttpService){
	}

	login(email: string, password: string) {
		return this.$http.post(API_URI + '/auth/login', {email: email, password: password});
	}
}

roomatchedApp.service('AuthService', AuthServiceProvider);
