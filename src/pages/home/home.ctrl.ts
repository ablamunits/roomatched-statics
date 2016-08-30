/// <reference path="../../../typings/tsd.d.ts" />

class HomeController {
	currentStripImageSrc: string = '';
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
		preferedNumberOfRoomates: 3
	};

	offererApartmentDetails: Apartment = <Apartment>{};
	offererRoomDetails: Room = <Room>{};
	offererSexPreffered: string = 'any';

	postList: Post[];

	constructor (private $scope: ng.IScope, private $http: ng.IHttpService, private UserService: UserServiceProvider, $stateParams, private AuthService, PostService, private $state, private StripImages, private $interval) {
		PostService.init().then((posts) => {
			let unshuffledPosts = posts.filter((post) => post.room.photoUrl);
			this.postList = this.shufflePosts(unshuffledPosts);
		});

		this.preferenceSelect = {
			smoking: PreferenceScore.Neutral,
			kosher: PreferenceScore.Neutral,
			vegan: PreferenceScore.Neutral,
			sharedExpences: PreferenceScore.Neutral,
			animals: PreferenceScore.Neutral,
			gayFriendly: PreferenceScore.Neutral,
			musicianFriendly: PreferenceScore.Neutral,
			nightLife: PreferenceScore.Neutral
		};

		this.mostValuablePreferenceSelect = {
			smoking: false,
			kosher: false,
			vegan: false,
			sharedExpences: false,
			animals: false,
			gayFriendly: false,
			musicianFriendly: false,
			nightLife: false
		};

		this.$scope.$watch('home.registrationComplete', () => {
			if (this.registrationComplete) {
				this.postRegistrationRedirect();
			}
		});

		this.startStripTransitions();
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
		this.registrationHasErrors = false;

		if (this.isUserInputValid()) {
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
		} else {
			this.registrationHasErrors = true;
		}
	}

	private isUserInputValid() {
		if (this.isSeekerRegistration) {
			return true; // its just numbers ...
		} else if (this.isOffererRegistration) {
			return (/^[-\'\sa-zA-Z0-9]*$/).test(this.offererApartmentDetails.address);
		}
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

	private startStripTransitions() {
		if (!this.currentStripImageSrc) {
			this.currentStripImageSrc = this.StripImages.Home[0];
		}

		this.$interval(() => {
			let currentIndex = this.StripImages.Home.indexOf(this.currentStripImageSrc);
			let totalImages = this.StripImages.Home.length;

			this.currentStripImageSrc = this.StripImages.Home[(currentIndex + 1) % totalImages];
		}, 5000);
	}

	private shufflePosts(array: Post[]) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}
};

roomatchedApp.controller('HomeCtrl', HomeController);
