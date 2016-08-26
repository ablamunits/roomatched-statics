class IconSetServiceProvider {
	public preferenceIcons = {
		smoking: './assets/icons/smoking.svg',
		kosher: './assets/icons/kosher.svg',
		vegan: './assets/icons/vegan.svg',
		sharedExpences: './assets/icons/money.svg',
		animals: './assets/icons/animals.svg',
		gayFriendly: './assets/icons/gay.svg',
		musicianFriendly: './assets/icons/musician.svg',
		nightLife: './assets/icons/nightLife.svg'
	};

	public preferenceTitles = {
		smoking: 'Smoking',
		kosher: 'Kosher',
		vegan: 'Vegan',
		sharedExpences: 'Shared Expences',
		animals: 'Animal Friendly',
		gayFriendly: 'Gay Friendly',
		musicianFriendly: 'Musician Friendly',
		nightLife: 'Nightly Lifestyle'
	};

	public apartmentIcons = {
		isFurnished: './assets/icons/furniture.svg',
		hasLivingRoom: './assets/icons/livingroom.svg',
		isRenovated: './assets/icons/renovated2.svg',
		hasElevator: './assets/icons/elevator.svg',
		hasParking: './assets/icons/parking.svg',
	};

	public apartmentIconsTitles = {
		isFurnished: 'Furnished Apartment',
		hasLivingRoom: 'Living Room',
		isRenovated: 'Renovated',
		hasElevator: 'Elevator',
		hasParking: 'Parking Available'
	};

	public roomIcons = {
		isFurnished: './assets/icons/furniture.svg',
		hasBalcony: './assets/icons/balcony.svg',
		seperateBathroom: './assets/icons/bathroom.svg',
		airConditioned: './assets/icons/air-conditioner.svg'
	};

	public roomIconsTitles = {
		isFurnished: 'Furnished Room',
		hasBalcony: 'Room With A Balcony',
		seperateBathroom: 'Seperate Bathroom',
		airConditioned: 'Air Conditioned Room'
	};

	public scoreNameToValue = {
		veryImportant: 2,
		important: 1,
		neutral: 0,
		preferNot: -1,
		noGo: -2
	};

	public scoreToTitle = {
		'2': 'Very Important',
		'1': 'Important',
		'0': 'Neutral',
		'-1': 'Prefer not',
		'-2': 'No go'
	};
}

roomatchedApp.service('IconSet', IconSetServiceProvider);
