class ApartmentPostDirectiveController {
	content: any;
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
}

function apartmentPostDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		scope: {
			content: '='
		},
		templateUrl: 'directives/apartment-post/apartment-post.tpl.html',
		controller: ApartmentPostDirectiveController,
		controllerAs: 'post',
		bindToController: true
	};
}

roomatchedApp.directive('apartmentPost', apartmentPostDirectiveFactory);
