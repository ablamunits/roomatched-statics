interface Match extends Post {
	preferences: Preferences<PreferenceScore>;
	matchPercentage: number;
	hasConversation: boolean;
	isFavorite: boolean;
	isPerfectFavourite: boolean;
	isFacebookFriend: boolean;
	mutualFriends: string[];
}

interface SeekerMatch extends Match, Post {

}

interface OffererMatch extends Match {
	user: User;
}
