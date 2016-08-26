class MatchServiceProvider {
	constructor(private $http: ng.IHttpService){
	}

	getSeekerMatches(id: number): ng.IPromise<SeekerMatch[]> {
		return this.$http.get(API_URI + `/match/${id}`).then((response) => {
			let data = <any[]>response.data;

			return data.map((responseObject) => {
				return {
					matchPercentage: responseObject.matchPercentage,
					postId: responseObject.postId,
					room: responseObject.room,
					apartment: responseObject.apartment,
					isFavorite: responseObject.isFavorite,
					hasConversation: responseObject.hasConversation,
					isFacebookFriend: responseObject.isFacebookFriend,
					isPerfectFavourite: responseObject.isPerfectFavourite,
					mutualFriends: responseObject.mutualFriends,
					user: {
						id: responseObject.user.id,
						type: UserType.Offerer,
						firstName: responseObject.user.firstName,
						lastName: responseObject.user.lastName,
						sex: responseObject.user.sex,
						photoUrl: responseObject.user.photoUrl,
						about: responseObject.user.about
					},
					preferences: responseObject.preferences
				};
			});
		});
	};

	getOffererMatches(id: number): ng.IPromise<OffererMatch[]> {
		return this.$http.get(API_URI + `/match/${id}`).then((response) => {
			let data = <any[]>response.data;

			return data.map((responseObject) => {
				return {
					matchPercentage: responseObject.matchPercentage,
					isFavorite: responseObject.isFavorite,
					hasConversation: responseObject.hasConversation,
					isFacebookFriend: responseObject.isFacebookFriend,
					isPerfectFavourite: responseObject.isPerfectFavourite,
					mutualFriends: responseObject.mutualFriends,
					user: <User>{
						id: responseObject.user.id,
						type: UserType.Seeker,
						firstName: responseObject.user.firstName,
						lastName: responseObject.user.lastName,
						sex: responseObject.user.sex,
						photoUrl: responseObject.user.photoUrl,
						about: responseObject.user.about
					},
					preferences: responseObject.preferences
				};
			});
		});
	}
}

roomatchedApp.service('MatchService', MatchServiceProvider);
