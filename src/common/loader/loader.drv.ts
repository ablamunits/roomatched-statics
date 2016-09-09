class LoaderDirectiveController {

}

function loaderDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		template: '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div><div class="loader">{{ randomLoadingMessage }} {{ $scope.randomLoadingMessage }}</div>',
		link: function (scope) {
			let randomLoadingMessages = ['Matching you up ...', 'Doing the hard work for you :)', 'You are about to get Roomatched!', 'Looking for great roommates!', 'Your new roommates are gonna be great!'];

			(scope as any).randomLoadingMessage = randomLoadingMessages[Math.floor(Math.random()*randomLoadingMessages.length)];
		},
		controller: LoaderDirectiveController,
		controllerAs: 'ctrl',
		bindToController: true
	};
}

roomatchedApp.directive('loader', loaderDirectiveFactory);
