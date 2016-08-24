class PreferenceViewerDirectiveController {
	prefScores: Preferences<PreferenceScore>;
	preferenceTitles: any;
	preferenceIcons: any;
	scoreNameToValue: any;
	scoreToTitle: any;

	constructor(IconSet) {
		this.preferenceTitles = IconSet.preferenceTitles;
		this.preferenceIcons = IconSet.preferenceIcons;
		this.scoreNameToValue = IconSet.scoreNameToValue;
		this.scoreToTitle = IconSet.scoreToTitle;
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
