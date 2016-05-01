var API_URI = 'http://vmedu92.mtacloud.co.il:8080/Roomatched/api';

// var roomatchedApp: ng.IModule = angular.module('RoomatchedApp', ['ngRoute', 'ngTypeit'])
var roomatchedApp: ng.IModule = angular.module('RoomatchedApp', ['ngRoute', 'ab.Typeit'])
.config(function ($routeProvider: any, $locationProvider: ng.ILocaleService) {
	$routeProvider
	.when('/', {
		templateUrl: 'pages/home/home.tpl.html',
		controller: 'HomeCtrl as home',
	})
	.when('/matches', {
		templateUrl: 'pages/matches/matches.tpl.html',
		controller: 'MatchesCtrl as matches'
	})
	.otherwise({
		redirectTo: '/'
	});
});
