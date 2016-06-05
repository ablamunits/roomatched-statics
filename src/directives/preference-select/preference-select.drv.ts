class PreferenceSelectDirectiveController {
	prefScores: Preferences;

	preferenceTitles = {
		smoking: 'Smoking',
		kosher: 'Kosher',
		vegan: 'Vegan',
		sharedExpences: 'Shared Expences',
		animals: 'Animal Friendly',
		gayFriendly: 'Gay Friendly',
		musicianFriendly: 'Musician Friendly'
	};

	preferenceIcons = {
		smoking: './assets/icons/smoking.svg',
		kosher: './assets/icons/kosher.svg',
		vegan: './assets/icons/vegan.svg',
		sharedExpences: './assets/icons/money.svg',
		animals: './assets/icons/animals.svg',
		gayFriendly: './assets/icons/gay.svg',
		musicianFriendly: './assets/icons/musician.svg'
	};

	scoreNameToValue = {
		veryImportant: 2,
		important: 1,
		neutral: 0,
		preferNot: -1,
		noGo: -2
	};

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
