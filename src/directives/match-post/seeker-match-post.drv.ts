class SeekerMatchPostDirectiveController {
	content: OffererMatch;
	matchIsVisible: boolean = true;

	matchMessage: string;
	messageStatus: MessageStatus = MessageStatus.NOT_SENT;
	messageStatuses = MessageStatus;

	mapCenter: any = {
		lat: null,
		lng: null
	};

	iconSet: IconSetServiceProvider;

	private postSlides = ['roomImage', 'apartmentImage', 'map', 'messaging'];
	currentSlide = this.postSlides[0];

	constructor(NgMap, private GeoCoder, private AuthService, private MessageService, private FavouriteService, private ngDialog, private $scope, IconSet) {
		let locationString = `${this.content.apartment.address}, ${this.content.apartment.city}, Israel`;
		this.GeoCoder.geocode({ address: locationString, region: 'IL' }).then((results) => {
			this.mapCenter.lat = results[0].geometry.location.lat();
			this.mapCenter.lng = results[0].geometry.location.lng();
		});

		this.iconSet = IconSet;
	}

	toggleStar() {
		let currentState = this.content.isFavorite;

		this.content.isFavorite = !currentState;
		this.FavouriteService.setFavourite(!currentState, this.AuthService.loggedUser.id, this.content.user.id)
		.catch((e) => {
			console.log('catch seeker');
			this.content.isFavorite = currentState;
		});
	}

	nextSlide() {
		this.currentSlide = this.postSlides[(this.postSlides.indexOf(this.currentSlide) + 1) % this.postSlides.length];
	}

	previousSlide() {
		this.currentSlide = this.postSlides[(this.postSlides.indexOf(this.currentSlide) - 1) % this.postSlides.length];
	}

	setSlide(slideKey: string) {
		if (this.postSlides.indexOf(slideKey) > -1) {
			this.currentSlide = slideKey;
		}
	}

	hide() {
		this.matchIsVisible = false;
	}

	unhide() {
		this.matchIsVisible = true;
	}

	sendMatchMessage(to: number) {
		this.messageStatus = MessageStatus.SENDING;

		this.MessageService.sendMessage(this.AuthService.loggedUser.id, to, this.matchMessage).then(() => {
			this.messageStatus = MessageStatus.SENT;
			this.matchMessage = '';
			this.content.hasConversation = true;
		});
	}

	openImageModal(imageUrl: string) {
		// Smelly way to check if im about to open a placeholder
		if (imageUrl.indexOf('./assets') > -1) {
			return;
		}

		this.ngDialog.open({ plain: true, width: '600px', template: `<img src="${imageUrl}"></img>`, className: 'ngdialog-theme-plain roomatched-image-modal' });
	}

	openUserModal() {
		this.ngDialog.open({
			template: './directives/match-post/match-user-modal.tpl.html',
			scope: this.$scope,
			className: 'ngdialog-theme-plain roomatched-image-modal'
		});
	}
}

function seekerMatchPostDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		scope: {
			content: '=ngModel'
		},
		templateUrl: 'directives/match-post/seeker-match-post.tpl.html',
		controller: SeekerMatchPostDirectiveController,
		controllerAs: 'ctrl',
		bindToController: true
	};
}

roomatchedApp.directive('seekerMatchPost', seekerMatchPostDirectiveFactory);
