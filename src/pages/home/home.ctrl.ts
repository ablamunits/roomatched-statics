/// <reference path="../../../typings/tsd.d.ts" />

class HomeController {
	isSeekerRegistration: boolean = false;
	isOffererRegistration: boolean = false;
	registrationHasErrors: boolean = false;
	registrationComplete: boolean = false;

	cityOptions: string[] = ['Tel-Aviv', 'Beer-Sheva', 'Jerusalem', 'Haifa'];
	newUser: User = <User>{};
	preferenceSelect: Preferences<PreferenceScore>;
	mostValuablePreferenceSelect: Preferences<boolean>;

	seekerRegistrationFields = {
		fromPrice: 1,
		toPrice: 2500,
		preferedCity: null,
		preferedNumberOfRoomates: 2
	};

	offererApartmentDetails: Apartment = <Apartment>{};
	offererRoomDetails: Room = <Room>{};
	offererSexPreffered: string = 'any';

	postList: Post[];

	constructor (private $scope: ng.IScope, private $http: ng.IHttpService, private UserService: UserServiceProvider, $stateParams, private AuthService, PostService, private $state) {
		PostService.init().then((posts) => this.postList = posts);

		this.preferenceSelect = {
			smoking: PreferenceScore.Neutral,
			kosher: PreferenceScore.Neutral,
			vegan: PreferenceScore.Neutral,
			sharedExpences: PreferenceScore.Neutral,
			animals: PreferenceScore.Neutral,
			gayFriendly: PreferenceScore.Neutral,
			musicianFriendly: PreferenceScore.Neutral
		};

		this.mostValuablePreferenceSelect = {
			smoking: false,
			kosher: false,
			vegan: false,
			sharedExpences: false,
			animals: false,
			gayFriendly: false,
			musicianFriendly: false,
		};

		this.$scope.$watch('home.registrationComplete', () => {
			if (this.registrationComplete) {
				this.postRegistrationRedirect();
			}
		});
	}

	openSeekerRegister() {
		this.isSeekerRegistration = true;
		this.isOffererRegistration = false;
	}

	openOffererRegister() {
		this.isOffererRegistration = true;
		this.isSeekerRegistration = false;
	};

	registerButtonClick() {
		FB.login((response: any) => {
			FB.api('/me', {
				fields: 'first_name,last_name,email,gender,birthday,picture.width(500).height(500),likes,friends'
			}, (response: any) => {
				if (!response.error) {
					this.newUser.facebookId = response.id;
					this.newUser.firstName = response.first_name;
					this.newUser.lastName = response.last_name;
					this.newUser.sex = response.gender;
					this.newUser.yearOfBirth = (new Date(response.birthday)).getUTCFullYear() || null;
					this.newUser.photoUrl = response.picture.data.url;

					if (response.friends) {
						this.newUser.facebookFriends = response.friends.data.map(d => d.id);
					} else {
						this.newUser.facebookFriends = [];
					}

					if (this.isSeekerRegistration) {
						this.registerAsSeeker();
					} else if (this.isOffererRegistration) {
						this.registerAsOfferer();
					}
				}
			});
		}, {scope: 'user_birthday, user_friends' });
	}

	private registerAsSeeker() {
		let seekerPreferences = {
			minPricePreffered: this.seekerRegistrationFields.fromPrice,
			maxPricePreffered: this.seekerRegistrationFields.toPrice,
			numberOfRoomates: this.seekerRegistrationFields.preferedNumberOfRoomates,
			city: this.seekerRegistrationFields.preferedCity
		};

		this.newUser.type = UserType.Seeker;

		this.UserService.registerUser(this.newUser, this.preferenceSelect, this.mostValuablePreferenceSelect, seekerPreferences).then((response) => {
			this.registrationComplete = true;
		}, (e) => {
			this.registrationHasErrors = true;
		});
	}

	private registerAsOfferer() {
		let offererDetails = {
			roomDetails: this.offererRoomDetails,
			apartmentDetails: this.offererApartmentDetails,
			sexPreffered: this.offererSexPreffered
		};

		this.newUser.type = UserType.Offerer;

		this.UserService.registerUser(this.newUser, this.preferenceSelect, this.mostValuablePreferenceSelect, offererDetails).then((response) => {
			this.registrationComplete = true;
		}, (e) => {
			this.registrationHasErrors = true;
		});
	}

	private postRegistrationRedirect() {
		this.AuthService.getLoginStatus((response) => {
			console.log(response);
			if (response.status === 'connected') {
				console.log('connected in post reg!');
				this.AuthService.init(response.authResponse.userID, response.authResponse.accessToken);
				this.AuthService.onAuthComplete(() => {
					this.$state.go('matches');
				});
			}
		});
	}
};

roomatchedApp.controller('HomeCtrl', HomeController);
