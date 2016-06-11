class IconSetServiceProvider {
	public preferenceIcons = {
		smoking: './assets/icons/smoking.svg',
		kosher: './assets/icons/kosher.svg',
		vegan: './assets/icons/vegan.svg',
		sharedExpences: './assets/icons/money.svg',
		animals: './assets/icons/animals.svg',
		gayFriendly: './assets/icons/gay.svg',
		musicianFriendly: './assets/icons/musician.svg'
	};

	public preferenceTitles = {
		smoking: 'Smoking',
		kosher: 'Kosher',
		vegan: 'Vegan',
		sharedExpences: 'Shared Expences',
		animals: 'Animal Friendly',
		gayFriendly: 'Gay Friendly',
		musicianFriendly: 'Musician Friendly'
	};

	public scoreNameToValue = {
		veryImportant: 2,
		important: 1,
		neutral: 0,
		preferNot: -1,
		noGo: -2
	};
}

roomatchedApp.service('IconSet', IconSetServiceProvider);
