var API_URI = 'http://vmedu92.mtacloud.co.il:8080/Roomatched/api';

var roomatchedApp: ng.IModule = angular.module('RoomatchedApp', ['ui.router', 'ab.Typeit', '720kb.tooltips', 'angular-svg-round-progressbar'])
.run(function($rootScope, $location, $state, $timeout, AuthService, $window) {
	$window.fbAsyncInit = function() {
		FB.init({
			appId      : '1754796394756872', // Roomatched appId
			cookie     : true,  // enable cookies to allow the server to access the session
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.5' // use graph api version 2.5
		});

		FB.getLoginStatus(function(response) {
			console.log('login status:', response);
			if (response.status === 'connected') {
				console.log('FB connected.');
				AuthService.init(response.authResponse.userID, response.authResponse.accessToken);
			} else {
				console.log('FB not connected.');
				AuthService.notifyAuthComplete(false);
				$state.go('home');
			}
		});
	};
})
.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $windowProvider) {
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
	.state('inbox', {
		url: '/inbox',
		templateUrl: 'pages/inbox/inbox.tpl.html',
		controller: 'InboxCtrl as inbox'
	})
	.state('profile', {
		url: '/profile?id',
		templateUrl: 'pages/profile/profile.tpl.html',
		controller: 'ProfileCtrl as profile',
	});
});
