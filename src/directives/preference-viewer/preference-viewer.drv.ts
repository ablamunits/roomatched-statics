class PreferenceViewerDirectiveController {
	prefScores: Preferences;
	preferenceTitles: any;
	preferenceIcons: any;
	scoreNameToValue: any;

	constructor(IconSet) {
		this.preferenceTitles = IconSet.preferenceTitles;
		this.preferenceIcons = IconSet.preferenceIcons;
		this.scoreNameToValue = IconSet.scoreNameToValue;
	}
}

function preferenceViewerDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		scope: {
			prefScores: '=ngModel'
		},
		require: 'ngModel',
		templateUrl: 'directives/preference-viewer/preference-viewer.tpl.html',
		controller: PreferenceViewerDirectiveController,
		controllerAs: 'ctrl',
		bindToController: true
	};
}

roomatchedApp.directive('preferenceViewer', preferenceViewerDirectiveFactory);
