/// <reference path="../../../typings/tsd.d.ts" />

class InboxController {
	constructor (private $scope: ng.IScope, private $http: ng.IHttpService, private $stateParams) {
	}
};

roomatchedApp.controller('InboxCtrl', InboxController);
