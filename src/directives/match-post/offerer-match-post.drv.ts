class OffererMatchPostDirectiveController {
	content: SeekerMatch;

	matchMessage: string;
	messageStatus: MessageStatus = MessageStatus.NOT_SENT;
	messageStatuses = MessageStatus;

	matchIsVisible: boolean = true;
	messagingIsVisible: boolean = false;

	constructor(NgMap, private GeoCoder, private AuthService, private MessageService, private FavouriteService, private ngDialog, private $scope) {

	}

	sendMatchMessage(to: number) {
		this.messageStatus = MessageStatus.SENDING;

		this.MessageService.sendMessage(this.AuthService.loggedUser.id, to, this.matchMessage).then(() => {
			this.messageStatus = MessageStatus.SENT;
			this.content.hasConversation = true;
		});
	}

	hide() {
		this.matchIsVisible = false;
	}

	unhide() {
		this.matchIsVisible = true;
	}

	toggleStar() {
		let currentState = this.content.isFavorite;

		this.content.isFavorite = !currentState;
		this.FavouriteService.setFavourite(!currentState, this.AuthService.loggedUser.id, this.content.user.id)
		.catch((e) => {
			this.content.isFavorite = currentState;
		});
	}

	showMessaging() {
		this.messagingIsVisible = true;
	}

	hideMessaging() {
		this.messagingIsVisible = false;
	}

	openUserModal() {
		this.ngDialog.open({
			template: './directives/match-post/match-user-modal.tpl.html',
			scope: this.$scope,
			className: 'ngdialog-theme-plain roomatched-image-modal'
		});
	}
}

function offererMatchPostDirectiveFactory(): ng.IDirective {
	return <ng.IDirective> {
		restrict: 'E',
		scope: {
			content: '=ngModel'
		},
		templateUrl: 'directives/match-post/offerer-match-post.tpl.html',
		controller: OffererMatchPostDirectiveController,
		controllerAs: 'ctrl',
		bindToController: true
	};
}

roomatchedApp.directive('offererMatchPost', offererMatchPostDirectiveFactory);
