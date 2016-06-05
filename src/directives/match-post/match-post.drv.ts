class MatchPostDirectiveController {
	content: Match;

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

	private postSlides = ['roomImage', 'apartmentImage', 'map'];
	currentSlide = this.postSlides[0];

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
}

function matchPostDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		scope: {
			content: '=ngModel'
		},
		templateUrl: 'directives/match-post/match-post.tpl.html',
		controller: MatchPostDirectiveController,
		controllerAs: 'ctrl',
		bindToController: true
	};
}

roomatchedApp.directive('matchPost', matchPostDirectiveFactory);
