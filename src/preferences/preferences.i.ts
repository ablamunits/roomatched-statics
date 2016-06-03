const NUM_OF_PREFERENCE_SCORES: number = 4;

enum PreferenceScore {
	// Neutral, Important, SomewhatImportant, NoGo
	VeryImportant = 2, Important = 1, Neutral = 0, PreferNot = -1, NoGo = -2
}

interface Preferences {
	smoking: PreferenceScore;
	kosher: PreferenceScore;
	vegan: PreferenceScore;
	sharedExpences: PreferenceScore;
	animals: PreferenceScore;
	musicianFriendly: PreferenceScore;
	gayFriendly: PreferenceScore;
};
