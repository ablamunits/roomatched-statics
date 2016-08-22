/// <reference path="../../../typings/tsd.d.ts" />

class MatchesController {
	matchesArray: SeekerMatch[] | OffererMatch[];
	showMatchesForSeeker: boolean = false;
	showMatchesForOfferer: boolean = false;
	hasNoMatches = false;

	filters: any = {
		starred: 'All',
		contacted: 'All',
	};

	constructor (private $scope: ng.IScope, private $http: ng.IHttpService, private $stateParams, private AuthService, private MatchService, private $state) {
		AuthService.onAuthComplete(() => {
			if (AuthService.userIsLoggedIn) {
				if (AuthService.loggedUser.type === UserType.Seeker) {
					this.showMatchesForSeeker = true;
					MatchService.getSeekerMatches(AuthService.loggedUser.id).then((matches: SeekerMatch[]) => {
						this.matchesArray = matches;
						if (this.matchesArray.length < 1) {
							this.hasNoMatches = true;
						}
					});
				} else if (AuthService.loggedUser.type === UserType.Offerer) {
					this.showMatchesForOfferer = true;
					MatchService.getOffererMatches(AuthService.loggedUser.id).then((matches: OffererMatch[]) => {
						this.matchesArray = matches;
						this.$scope.$applyAsync();
						if (this.matchesArray.length < 1) {
							this.hasNoMatches = true;
						}
					});
				}
			} else {
				$state.go('home');
			}
		});
	}
};

roomatchedApp.controller('MatchesCtrl', MatchesController);
