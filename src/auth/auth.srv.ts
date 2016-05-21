class AuthServiceProvider {
	private authComplete: boolean = false;
	private authCompleteCallbacks: any[] = [];

	userIsLoggedIn: boolean = false;
	loggedUser: User;
	FBAccessToken: string;
	FBUserId: string;

	constructor(private $http: ng.IHttpService){
		console.log('Authorization service constructor...');
	}

	login() {
		FB.login((response: any) => {
			this.init(response.authResponse.userID, response.authResponse.accessToken);
		});
	}

	logout(callback) {
		FB.logout((response: any) => {
				console.log(response);
				callback();
		});
	};

	getUserByFacebookId(id: string) {
			return this.$http.get(API_URI + '/user/fb/' + id).then(response => {
				return response.data;
			});
	};

	init(fbUID: string, fbAT: string) {
		this.FBUserId = fbUID;
		this.FBAccessToken = fbAT;
		this.userIsLoggedIn = true;

		this.getUserByFacebookId(this.FBUserId).then((user: any) => {
			this.loggedUser = user;
			this.loggedUser.type = user.type.toLowerCase() === 'seeker' ? UserType.Seeker : UserType.Offerer;
			this.notifyAuthComplete();
		});
	}

	onAuthComplete(cb) {
		if (this.authComplete) {
			cb();
		} else {
			this.authCompleteCallbacks.push(cb);
		}
	}

	private notifyAuthComplete() {
		this.authComplete = true;
		angular.forEach(this.authCompleteCallbacks, (cb) => {
			cb();
		});
		this.authCompleteCallbacks = [];
	}
}

roomatchedApp.service('AuthService', AuthServiceProvider);
