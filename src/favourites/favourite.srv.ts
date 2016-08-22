class FavouriteServiceProvider {
	constructor(private $http: ng.IHttpService) {
	}

	setFavourite(newState: boolean, userId: number, matchId: number) {
		if (newState === true) {
			return this.markFavourite(userId, matchId);
		} else {
			return this.removeFavourite(userId, matchId);
		}
	}

	private markFavourite(userId: number, matchId: number) {
		let payload = {
			userId: userId,
			matchingUserId: matchId
		};

		return this.$http.post(API_URI + `/favorite`, payload).then((r) => {
			console.log(`User ${userId} starred match post ${matchId}!`);
		}).catch((e) => {
			throw e;
		});
	}

	private removeFavourite(userId: number, matchId: number) {
		let payload = {
			userId: userId,
			matchingUserId: matchId
		};

		return this.$http.post(API_URI + `/favorite/delete`, payload).then((r) => {
			console.log(`User ${userId} un-starred match post ${matchId}!`);
		}).catch((e) => {
			throw e;
		});
	}
}

roomatchedApp.service('FavouriteService', FavouriteServiceProvider);
