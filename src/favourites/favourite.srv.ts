class FavouriteServiceProvider {
	constructor(private $http: ng.IHttpService) {
	}

	setFavourite(userId: number, matchId: number) {
		let payload = {
			seekerId: userId,
			postId: matchId
		};

		return this.$http.post(API_URI + `/favorite`, payload).then((r) => {
			console.log(`User ${userId} starred match post ${matchId}!`);
		});
	}

	unsetFavourite(userId: number, matchId: number) {
		return this.$http.post(API_URI + `/favorite/delete?seekerId=${userId}&postId=${matchId}`, {}).then((r) => {
			console.log(`User ${userId} un-starred match post ${matchId}!`);
		});
	}
}

roomatchedApp.service('FavouriteService', FavouriteServiceProvider);
