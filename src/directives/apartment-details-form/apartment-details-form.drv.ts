class ApartmentDetailsFormDirectiveController {
	apartmentDetails: Apartment;
}

function apartmentDetailsFormDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		scope: {
			apartmentDetails: '=ngModel'
		},
		require: 'ngModel',
		templateUrl: 'directives/apartment-details-form/apartment-details-form.tpl.html',
		controller: ApartmentDetailsFormDirectiveController,
		controllerAs: 'ctrl',
		bindToController: true
	};
}

roomatchedApp.directive('apartmentDetailsForm', apartmentDetailsFormDirectiveFactory);
