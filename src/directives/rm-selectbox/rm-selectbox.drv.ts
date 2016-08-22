class RoomatchedSelectboxDirectiveController {
	selection: string;
	options: string[];

	constructor(private $scope) {
		if (this.options.indexOf(this.selection) < 0) {
			this.selection = this.options[0];
		}
	}

	setSelection(option: string) {
		this.selection = option;
	}
}

function roomatchedSelectboxDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		scope: {
			selection: '=ngModel',
			options: '='
		},
		require: 'ngModel',
		templateUrl: 'directives/rm-selectbox/rm-selectbox.tpl.html',
		controller: RoomatchedSelectboxDirectiveController,
		controllerAs: 'ctrl',
		bindToController: true
	};
}

roomatchedApp.directive('rmSelect', roomatchedSelectboxDirectiveFactory);
