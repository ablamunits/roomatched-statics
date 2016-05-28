class RoomDetailsFormDirectiveController {
	roomDetails: Room;
}

function roomDetailsFormDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		scope: {
			roomDetails: '=ngModel'
		},
		require: 'ngModel',
		templateUrl: 'directives/room-details-form/room-details-form.tpl.html',
		controller: RoomDetailsFormDirectiveController,
		controllerAs: 'ctrl',
		bindToController: true
	};
}

roomatchedApp.directive('roomDetailsForm', roomDetailsFormDirectiveFactory);
