class StripImagesServiceProvider {
	public homeImages = [
		'./assets/images/strip2.jpg',
		'./assets/images/strip3.jpg',
		'./assets/images/strip4.jpg',
		'./assets/images/strip5.jpg',
	];

	public get Home() {
		return this.homeImages;
	}
}

roomatchedApp.service('StripImages', StripImagesServiceProvider);
