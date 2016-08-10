class RoomDetailsFormDirectiveController {
	roomDetails: Room;

	constructor(private CloudinaryService) {};

	uploadRoomImage(files) {
		this.CloudinaryService.uploadFiles(files, (data) => {
			this.roomDetails.photoUrl = data.url;
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
