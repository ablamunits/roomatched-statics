var roomatchedApp: ng.IModule = angular.module('RoomatchedApp', ['ngRoute'])
.config(function ($routeProvider: any, $locationProvider: ng.ILocaleService) {
	$routeProvider
	.when('/', {
		templateUrl: 'home/home.tpl.html',
		controller: 'HomeCtrl as home',
	})
	.otherwise({
		redirectTo: '/'
	});
});
