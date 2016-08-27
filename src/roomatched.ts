var API_URI = 'http://vmedu92.mtacloud.co.il:8080/Roomatched/api';

// Components dependency is angular-floating-label
var roomatchedApp: ng.IModule = angular.module('RoomatchedApp', ['ui.router', 'ab.Typeit', '720kb.tooltips', 'angular-svg-round-progressbar', 'ngMap', 'cloudinary', 'ngFileUpload', 'components', 'ngDialog', 'duScroll'])
.config(['cloudinaryProvider', function(cloudinaryProvider) {
	cloudinaryProvider
		.set('cloud_name', 'roomatched')
		.set('upload_preset', 'f0dwrr6s');
}])
.run(function($rootScope, $location, $state, $timeout, AuthService, $window) {
	$rootScope.$state = $state;

	$window.fbAsyncInit = function() {
		FB.init({
			appId      : '1754796394756872', // Roomatched appId
			cookie     : true,  // enable cookies to allow the server to access the session
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.5' // use graph api version 2.5
		});

		FB.getLoginStatus(function(response) {
			console.log('FB login status:', response);
			if (response.status === 'connected') {
				AuthService.init(response.authResponse.userID, response.authResponse.accessToken);
				$state.go('matches');
				//// Enable the lines below if you want to be redirected to matches page upon initial page-load login
				// AuthService.onAuthComplete(() => {
				// 	if (AuthService.userIsLoggedIn) {
				// 		$state.go('matches');
				// 	}
				// });
			} else {
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
		data: { pageTitle: 'Roomatched | Welcome' }
	})
	.state('matches', {
		url: '/matches',
		templateUrl: 'pages/matches/matches.tpl.html',
		controller: 'MatchesCtrl as matches',
		data: { pageTitle: 'Roomatched | Matches' }
	})
	.state('inbox', {
		url: '/inbox',
		templateUrl: 'pages/inbox/inbox.tpl.html',
		controller: 'InboxCtrl as inbox',
		data: { pageTitle: 'Roomatched | Inbox' }
	})
	.state('profile', {
		url: '/profile?id',
		templateUrl: 'pages/profile/profile.tpl.html',
		controller: 'ProfileCtrl as profile',
		data: { pageTitle: 'Roomatched | Profile' }
	});
});
