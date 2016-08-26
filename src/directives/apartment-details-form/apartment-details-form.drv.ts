class ApartmentDetailsFormDirectiveController {
	apartmentDetails: Apartment;
	cityOptions: string[] = ['Tel-Aviv', 'Beer-Sheva', 'Jerusalem', 'Haifa'];

	constructor(private CloudinaryService){};

	uploadApartmentImage(files) {
		this.CloudinaryService.uploadFiles(files, (data) => {
			this.apartmentDetails.photoUrl = data.url;
		});
	}
}

function apartmentDetailsFormDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		scope: {
			apartmentDetails: '=ngModel'
		},
		require: 'ngModel',
		replace: true,
		templateUrl: 'directives/apartment-details-form/apartment-details-form.tpl.html',
		controller: ApartmentDetailsFormDirectiveController,
		controllerAs: 'ctrl',
		bindToController: true
	};
}

roomatchedApp.directive('apartmentDetailsForm', apartmentDetailsFormDirectiveFactory);
