class AuthServiceProvider {
	constructor(private $http: ng.IHttpService){
	}

	login(email: string, password: string) {
		return this.$http.post(API_URI + '/auth/login', {email: email, password: password});
	}

	logout() {
		this.$http.post(API_URI + '/auth/logout', null);
	}

	getAuthState() {
		return this.$http.get(API_URI + '/auth');
	}
}

roomatchedApp.service('AuthService', AuthServiceProvider);
