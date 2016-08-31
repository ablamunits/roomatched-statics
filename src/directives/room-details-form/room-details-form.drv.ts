class RoomDetailsFormDirectiveController {
	roomDetails: Room;
	roomIcons: any;

	isImageUploading: boolean = false;
	imageUploadPercentComplete: number = 0;

	constructor(private CloudinaryService, IconSet) {
		this.roomIcons = IconSet.roomIcons;
	};

	uploadRoomImage(files) {
		this.imageUploadPercentComplete = 0;
		this.isImageUploading = true;

		this.CloudinaryService.uploadFiles(files, (data) => {
			this.roomDetails.photoUrl = data.url;
			this.isImageUploading = false;
		}, (percentComplete) => {
			this.imageUploadPercentComplete = percentComplete.toFixed(1);
		});
	}
}

function roomDetailsFormDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		scope: {
			roomDetails: '=ngModel'
		},
		require: 'ngModel',
		replace: true,
		templateUrl: 'directives/room-details-form/room-details-form.tpl.html',
		controller: RoomDetailsFormDirectiveController,
		controllerAs: 'ctrl',
		bindToController: true
	};
}

roomatchedApp.directive('roomDetailsForm', roomDetailsFormDirectiveFactory);
