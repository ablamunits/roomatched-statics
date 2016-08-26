class ApartmentPostDirectiveController {
	content: any;
	iconSet: IconSetServiceProvider;

	constructor(IconSet) {
		this.iconSet = IconSet;
	}
}

function apartmentPostDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		scope: {
			content: '='
		},
		templateUrl: 'directives/apartment-post/apartment-post.tpl.html',
		controller: ApartmentPostDirectiveController,
		controllerAs: 'post',
		bindToController: true
	};
}

roomatchedApp.directive('apartmentPost', apartmentPostDirectiveFactory);
