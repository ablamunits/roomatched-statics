interface Match extends Post {
	preferences: Preferences;
	matchPercentage: number;
}

interface SeekerMatch extends Match, Post {

}

interface OffererMatch extends Match {
	user: User;
}
