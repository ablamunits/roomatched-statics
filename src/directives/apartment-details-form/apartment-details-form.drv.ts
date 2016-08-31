class ApartmentDetailsFormDirectiveController {
	apartmentDetails: Apartment;
	cityOptions: string[] = ['Tel-Aviv', 'Beer-Sheva', 'Jerusalem', 'Haifa'];
	apartmentIcons: any;
	apartmentIconsTitles: any;

	isImageUploading: boolean = false;
	imageUploadPercentComplete: number = 0;

	constructor(private CloudinaryService, IconSet) {
		this.apartmentIcons = IconSet.apartmentIcons;
		this.apartmentIconsTitles = IconSet.apartmentIconsTitles;
	};

	uploadApartmentImage(files) {
		this.imageUploadPercentComplete = 0;
		this.isImageUploading = true;

		this.CloudinaryService.uploadFiles(files, (data) => {
			this.apartmentDetails.photoUrl = data.url;
			this.isImageUploading = false;
		}, (percentComplete) => {
			this.imageUploadPercentComplete = percentComplete.toFixed(1);
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
