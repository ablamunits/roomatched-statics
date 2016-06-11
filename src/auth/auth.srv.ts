class AuthServiceProvider {
	private authComplete: boolean = false;
	private authCompleteCallbacks: any[] = [];

	userIsLoggedIn: boolean = false;
	loggedUser: User;
	FBAccessToken: string;
	FBUserId: string;

	constructor(private $http: ng.IHttpService, private $state, private UserService){};

	login() {
		FB.login((response: any) => {
			if (response.authResponse) {
				this.init(response.authResponse.userID, response.authResponse.accessToken);
			};
		});
	}

	logout(callback) {
		FB.logout((response: any) => {
				this.userIsLoggedIn = false;
				this.loggedUser = null;
				this.FBAccessToken = null;
				this.FBUserId = null;
				callback();
		});
	};

	getUserByFacebookId(id: string) {
			return this.UserService.getUserByFacebookId(id).then(response => {
				// console.log(response);
				return response.data;
			}, e => {
				console.error('Could not find user by Facebook id.');
				this.notifyAuthComplete();
				this.$state.go('home');
			});
	};

	init(fbUID: string, fbAT: string) {
		this.getUserByFacebookId(fbUID).then((userData: any) => {
			if (userData) {
				this.FBUserId = fbUID;
				this.FBAccessToken = fbAT;
				this.loggedUser = userData;
				this.loggedUser.type = userData.type.toLowerCase() === 'seeker' ? UserType.Seeker : UserType.Offerer;
				this.userIsLoggedIn = true;

				this.notifyAuthComplete();
			} else {
				console.log('Did not find user ' + fbUID + ' in DB. Probably never registered?');
				FB.logout((res) => {
					console.log(res);
				});
			}
		});
	}

	onAuthComplete(cb) {
		if (this.authComplete) {
			cb();
		} else {
			this.authCompleteCallbacks.push(cb);
		}
	}

	notifyAuthComplete(runCallbacks: boolean = true) {
		this.authComplete = true;
		if (!runCallbacks) {
			return;
		}

		angular.forEach(this.authCompleteCallbacks, (cb) => {
			cb(this.userIsLoggedIn);
		});
		this.authCompleteCallbacks = [];
	}
}

roomatchedApp.service('AuthService', AuthServiceProvider);
