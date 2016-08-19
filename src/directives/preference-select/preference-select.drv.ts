class PreferenceSelectDirectiveController {
	prefScores: Preferences<PreferenceScore>;
	mostValueable: Preferences<boolean>;

	preferenceTitles: any;
	preferenceIcons: any;
	scoreNameToValue: any;

	numberOfMarkedAsValuable: number;

	constructor(IconSet) {
		this.preferenceTitles = IconSet.preferenceTitles;
		this.preferenceIcons = IconSet.preferenceIcons;
		this.scoreNameToValue = IconSet.scoreNameToValue;

		// Init number of preferences that are marked as "true"
		let tempArray = [];
		for (var key in this.mostValueable) {
			if (this.mostValueable[key] === true) {
				tempArray.push(this.mostValueable[key]);
			}
		};

		this.numberOfMarkedAsValuable = tempArray.length;
	}

	preferenceClick(preferenceKey: string, scoreName: string) {
		this.prefScores[preferenceKey] = this.scoreNameToValue[scoreName];
	}

	mostValueableCheck(preferenceKey: string) {
		if (this.mostValueable[preferenceKey] === true || this.numberOfMarkedAsValuable < 3) {
			this.mostValueable[preferenceKey] = !this.mostValueable[preferenceKey];

			this.numberOfMarkedAsValuable = this.mostValueable[preferenceKey] ? this.numberOfMarkedAsValuable += 1 : this.numberOfMarkedAsValuable -= 1;
		}
	}
}

function preferenceSelectDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		scope: {
			prefScores: '=ngModel',
			mostValueable: '=mvp'
		},
		require: 'ngModel',
		templateUrl: 'directives/preference-select/preference-select.tpl.html',
		controller: PreferenceSelectDirectiveController,
		controllerAs: 'ctrl',
		bindToController: true
	};
}

roomatchedApp.directive('preferenceSelect', preferenceSelectDirectiveFactory);
