class OffererMatchPostDirectiveController {
	content: SeekerMatch;

	matchMessage: string;
	messageStatus: MessageStatus = MessageStatus.NOT_SENT;
	messageStatuses = MessageStatus;

	matchIsVisible: boolean = true;
	messagingIsVisible: boolean = false;

	constructor(NgMap, private GeoCoder, private AuthService, private MessageService) {

	}

	sendMatchMessage(to: number) {
		this.messageStatus = MessageStatus.SENDING;

		this.MessageService.sendMessage(this.AuthService.loggedUser.id, to, this.matchMessage).then(() => {
			this.messageStatus = MessageStatus.SENT;
		});
	}

	hide() {
		this.matchIsVisible = false;
	}

	unhide() {
		this.matchIsVisible = true;
	}

	showMessaging() {
		this.messagingIsVisible = true;
	}

	hideMessaging() {
		this.messagingIsVisible = false;
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
