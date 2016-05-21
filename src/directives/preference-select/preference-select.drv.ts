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
		smoking: '/assets/icons/smoking.svg',
		kosher: '/assets/icons/kosher.svg',
		vegan: '/assets/icons/vegan.svg',
		sharedExpences: '/assets/icons/money.svg',
		animals: '/assets/icons/animals.svg',
		gayFriendly: '/assets/icons/gay.svg',
		musicianFriendly: '/assets/icons/musician.svg'
	};

	preferenceClick(preference: string) {
		this.prefScores[preference] = (this.prefScores[preference] + 1) % NUM_OF_PREFERENCE_SCORES;
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
