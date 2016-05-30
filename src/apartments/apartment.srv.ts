class ApartmentServiceProvider {
	constructor(private $http: ng.IHttpService, private PostService){
	}

	getApartmentDetailsByOffererId(id: number) {
		return this.PostService.getPostByOffererId(id).then((post) => {
			console.log(post);
			return {
				roomDetails: post.room,
				apartmentDetails: post.apartment
			}
		});
	}

	updateApartment(id: number, apartment: Apartment) {
		return this.$http.post(API_URI + `/apartment/${id}`, apartment).then((r) => {
			console.log('apt update ok?');
		});
	}
}

roomatchedApp.service('ApartmentService', ApartmentServiceProvider);
