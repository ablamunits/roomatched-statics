class PreferenceSelectDirectiveController {
	prefScores: Preferences<PreferenceScore>;

	preferenceTitles: any;
	preferenceIcons: any;
	scoreNameToValue: any;

	constructor(IconSet) {
		this.preferenceTitles = IconSet.preferenceTitles;
		this.preferenceIcons = IconSet.preferenceIcons;
		this.scoreNameToValue = IconSet.scoreNameToValue;
	}

	preferenceClick(preferenceKey: string, scoreName: string) {
		this.prefScores[preferenceKey] = this.scoreNameToValue[scoreName];
	}
}

function preferenceSelectDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		scope: {
			prefScores: '=ngModel'
		},
		require: 'ngModel',
		templateUrl: 'directives/preference-select/preference-select.tpl.html',
		controller: PreferenceSelectDirectiveController,
		controllerAs: 'ctrl',
		bindToController: true
	};
}

roomatchedApp.directive('preferenceSelect', preferenceSelectDirectiveFactory);
