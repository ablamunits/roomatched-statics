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

	apartmentIcons = {
		isFurnished: './assets/icons/furniture.svg',
		hasLivingRoom: './assets/icons/livingroom.svg',
		isRenovated: './assets/icons/renovated2.svg',
		hasElevator: './assets/icons/elevator.svg',
		hasParking: './assets/icons/parking.svg',
	};

	roomIcons = {
		isFurnished: './assets/icons/furniture.svg',
		hasBalcony: './assets/icons/balcony.svg',
		seperateBathroom: './assets/icons/bathroom.svg',
		airConditioned: './assets/icons/air-conditioner.svg'
	};

	private postSlides = ['roomImage', 'apartmentImage', 'map', 'messaging'];
	currentSlide = this.postSlides[0];

	constructor(NgMap, private GeoCoder, private AuthService, private MessageService, private FavouriteService) {
		let locationString = `${this.content.apartment.address}, ${this.content.apartment.city}, Israel`;
		this.GeoCoder.geocode({ address: locationString, region: 'IL' }).then((results) => {
			this.mapCenter.lat = results[0].geometry.location.lat();
			this.mapCenter.lng = results[0].geometry.location.lng();
		});
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
			this.content.hasConversation = true;
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
