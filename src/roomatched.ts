var roomatchedApp: ng.IModule = angular.module('RoomatchedApp', ['ngRoute'])
.config(function ($routeProvider: any, $locationProvider: ng.ILocaleService) {
	$routeProvider
	.when('/', {
		templateUrl: 'pages/home/home.tpl.html',
		controller: 'HomeCtrl as home',
	})
	.otherwise({
		redirectTo: '/'
	});
});
