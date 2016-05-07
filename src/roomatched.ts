var API_URI = 'http://vmedu92.mtacloud.co.il:8080/Roomatched/api';

var roomatchedApp: ng.IModule = angular.module('RoomatchedApp', ['ui.router', 'ab.Typeit', '720kb.tooltips'])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
	$httpProvider.defaults.withCredentials = true;

	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'pages/home/home.tpl.html',
		controller: 'HomeCtrl as home',
	})
	.state('matches', {
		url: '/matches',
		templateUrl: 'pages/matches/matches.tpl.html',
		controller: 'MatchesCtrl as matches'
	})
	.state('profile', {
		url: '/profile?id',
		templateUrl: 'pages/profile/profile.tpl.html',
		controller: 'ProfileCtrl as profile'
	});
});
