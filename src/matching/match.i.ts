interface Match extends Post {
	preferences: Preferences<PreferenceScore>;
	matchPercentage: number;
}

interface SeekerMatch extends Match, Post {

}

interface OffererMatch extends Match {
	user: User;
}
