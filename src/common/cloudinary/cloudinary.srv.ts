class CloudinaryServiceProvider {
	constructor(private $http: ng.IHttpService, private Upload, private cloudinary){};

	get Config() {
		return this.cloudinary.config();
	}

	uploadFiles(files, onUploadCompleteCb) {
		angular.forEach(files, (file) => {
			if (file) {
				file.upload = this.Upload.upload({
					url: `https://api.cloudinary.com/v1_1/${this.Config.cloud_name}/upload`,
					withCredentials: false,
					data: {
						upload_preset: this.Config.upload_preset,
						file: file
					}
				});

				file.upload.then((response) => {
					onUploadCompleteCb(response.data);
				}, function (response) {
					if (response.status > 0) {
						// Error
					}
				}, function (evt) {
					// Progress
				});
			}
		});
	}
}

roomatchedApp.service('CloudinaryService', CloudinaryServiceProvider);
