/// <reference path="../../../typings/tsd.d.ts" />

class MatchesController {
	matchesArray: SeekerMatch[] | OffererMatch[];
	showMatchesForSeeker: boolean = false;
	showMatchesForOfferer: boolean = false;

	constructor (private $scope: ng.IScope, private $http: ng.IHttpService, private $stateParams, private AuthService, private MatchService, private $state) {
		AuthService.onAuthComplete(() => {
			if (AuthService.userIsLoggedIn) {
				if (AuthService.loggedUser.type === UserType.Seeker) {
					this.showMatchesForSeeker = true;
					MatchService.getSeekerMatches(AuthService.loggedUser.id).then((matches: SeekerMatch[]) => {
						this.matchesArray = matches;
					});
				} else if (AuthService.loggedUser.type === UserType.Offerer) {
					this.showMatchesForOfferer = true;
					MatchService.getOffererMatches(AuthService.loggedUser.id).then((matches: OffererMatch[]) => {
						this.matchesArray = matches;
					});
				}
			} else {
				$state.go('home');
			}
		});
	}
};

roomatchedApp.controller('MatchesCtrl', MatchesController);
