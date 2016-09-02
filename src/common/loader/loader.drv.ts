class LoaderDirectiveController {

}

function loaderDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		require: 'ngModel',
		template: '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>',
		controller: LoaderDirectiveController,
		controllerAs: 'ctrl',
		bindToController: true
	};
}

roomatchedApp.directive('loader', loaderDirectiveFactory);
