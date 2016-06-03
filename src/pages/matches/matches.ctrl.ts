/// <reference path="../../../typings/tsd.d.ts" />

class MatchesController {
	matchList: Match[] = <any>[{
		user: 'bob',
		matchPercent: 50
	}];

	constructor (private $scope: ng.IScope, private $http: ng.IHttpService, private $stateParams) {
		console.log('matches controller ctor');
	}
};

roomatchedApp.controller('MatchesCtrl', MatchesController);
