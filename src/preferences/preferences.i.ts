const NUM_OF_PREFERENCE_SCORES: number = 4;

enum PreferenceScore {
	Neutral, Important, SomewhatImportant, NoGo
}

interface Preferences {
	smoking: PreferenceScore;
	kosher: PreferenceScore;
	vegan: PreferenceScore;
	sharedExpences: PreferenceScore;
	animals: PreferenceScore;
	musicianFriendly: PreferenceScore;
	gayFriendly: PreferenceScore;
	seekerOccupation?: string;
};
