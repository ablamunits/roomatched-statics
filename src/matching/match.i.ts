interface Match extends Post {
	preferences: Preferences;
	matchPercent: number;
}

interface SeekerMatch extends Match, Post {

}

interface OffererMatch extends Match, User {

}
