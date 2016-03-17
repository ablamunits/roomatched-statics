/// <reference path="../typings/tsd.d.ts" />

var roomatchedApp = angular.module('RoomatchedApp', ['ngRoute'])
.config(function ($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'templates/main.html',
		controller: 'mainCtrl'
	})
	.when('/register', {
		templateUrl: 'templates/register.html',
		controller: 'registerCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});

});
