class RoomatchedCheckboxDirectiveController {
	isChecked: boolean;
	label: string;
	icon: string;

	toggle() {
		this.isChecked = !this.isChecked;
	}
}

function roomatchedCheckboxDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		scope: {
			isChecked: '=ngModel',
			label: '@',
			icon: '='
		},
		require: 'ngModel',
		templateUrl: 'directives/rm-checkbox/rm-checkbox.tpl.html',
		controller: RoomatchedCheckboxDirectiveController,
		controllerAs: 'ctrl',
		bindToController: true
	};
}

roomatchedApp.directive('rmCheckbox', roomatchedCheckboxDirectiveFactory);
