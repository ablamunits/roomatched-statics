const NUM_OF_PREFERENCE_SCORES: number = 4;

enum PreferenceScore {
	VeryImportant = 2, Important = 1, Neutral = 0, PreferNot = -1, NoGo = -2
}

interface Preferences<T> {
	smoking: T;
	kosher: T;
	vegan: T;
	sharedExpences: T;
	animals: T;
	musicianFriendly: T;
	gayFriendly: T;
	nightLife: T;
};

interface MostValuablePreferences {
	mostValuablePreferences: Preferences<boolean>;
}
