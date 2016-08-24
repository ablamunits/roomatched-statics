class ApartmentServiceProvider {
	constructor(private $http: ng.IHttpService, private PostService: PostServiceProvider){
	}

	getApartmentDetailsByOffererId(id: number) {
		return this.PostService.getPostByOffererId(id).then((post: any) => {
			return {
				roomDetails: post.room,
				apartmentDetails: post.apartment
			};
		});
	}

	updateApartment(id: number, apartment: Apartment) {
		return this.$http.post(API_URI + `/apartment/${id}`, apartment).then((r) => {
			console.log('Apartment updated.');
		});
	}
}

roomatchedApp.service('ApartmentService', ApartmentServiceProvider);
