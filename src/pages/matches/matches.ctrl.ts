/// <reference path="../../../typings/tsd.d.ts" />

class MatchesController {
	constructor (private $scope: ng.IScope, private $http: ng.IHttpService, private $routeParams) {
		console.log('matches controller ctor');
	}
};

roomatchedApp.controller('MatchesCtrl', MatchesController);
