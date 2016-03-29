enum PreferenceScore {
	Neutral, Low, Medium, High
}

interface IPreferences {
	smoking: PreferenceScore;
	kosher: PreferenceScore;
	vegan: PreferenceScore;
	sharedExpences: PreferenceScore;
	animals: PreferenceScore;
	musicianFriendly: PreferenceScore;
	gayFriendly: PreferenceScore;
};
