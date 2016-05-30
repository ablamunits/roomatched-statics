class PostServiceProvider {
	constructor(private $http: ng.IHttpService){
	}

	init() {
		return this.$http.get(API_URI + '/post').then((response) => {
			return response.data;
		});
	}

	getPostByOffererId(id: number) {
		return this.$http.get(API_URI + `/post/${id}`).then((response) => {
			return response.data;
		});
	}
}

roomatchedApp.service('PostService', PostServiceProvider);
