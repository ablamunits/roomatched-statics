/// <reference path="../../../typings/tsd.d.ts" />

class InboxController {
	conversations: Conversation[];
	myUserId: number;
	myPhotoUrl: string;

	visibleConversationContent: Message[];
	visibleConversation: Conversation;

	newMessageContent: string;

	isPolling: boolean = false;
	pollingPromise: any;

	constructor (private MessageService, private AuthService, private $state, private $interval, private $scope, private $timeout) {
		AuthService.onAuthComplete(() => {
			if (AuthService.userIsLoggedIn) {
				this.myUserId = AuthService.loggedUser.id;
				this.myPhotoUrl = AuthService.loggedUser.photoUrl;

				MessageService.getAllUserConversations(this.myUserId).then((conversationData) => {
					this.conversations = conversationData;
				});
			} else {
				this.$state.go('home');
			}
		});

		$scope.$on('$stateChangeStart', () => {
			console.log('should stop polling now ...');
			this.stopMessagePolling();
		});

		$scope.$watch('inbox.visibleConversationContent', (newVal, oldVal) => {
			if (newVal && oldVal && newVal.length !== oldVal.length) {
				console.log('doing conversation scroll!');
				this.doConversationContentScroll();
			}
		});
	}

	toggleConversation(conversationId: number) {
		if (this.visibleConversation && conversationId === this.visibleConversation.conversationId) {
			this.resetVisibleConversation();
			return;
		}

		this.resetVisibleConversation();

		let requestedConversation: Conversation = this.conversations.filter((c) => {
			return c.conversationId === conversationId;
		})[0];

		this.visibleConversation = requestedConversation;

		this.MessageService.getConversationContentById(conversationId).then(content => {
			this.visibleConversationContent = content;
			this.startMessagePolling(conversationId);

			this.$timeout(() => {
				this.doConversationContentScroll();
			}, 100);
		});
	}

	sendMessage($event: JQueryEventObject) {
		if ($event.shiftKey === false && $event.which === 13) {
			this.performMessageSend();
		} else {
			return;
		}
	}

	private performMessageSend() {
		// Attach the 'fake' content.
		this.visibleConversationContent.push({
				from: this.myUserId,
				to: this.visibleConversation.userId,
				content: this.newMessageContent,
				timeStamp: Date.now()
		});

		let messageCopy = angular.copy(this.newMessageContent);
		this.newMessageContent = '';

		this.MessageService.sendMessage(this.myUserId, this.visibleConversation.userId, messageCopy).then(() => {
			this.MessageService.getConversationContentById(this.visibleConversation.conversationId).then(content => {
				this.visibleConversationContent = content;
				this.doConversationContentScroll();
			});
		});
	}

	private doConversationContentScroll() {
		let $conv = $('.visible-conversation .conversation-message-list');
		$conv.animate({ scrollTop: $conv[0].scrollHeight}, 1000);
	}

	private resetVisibleConversation() {
		this.visibleConversation = null;
		this.visibleConversationContent = null;
		this.newMessageContent = '';
		this.stopMessagePolling();
	}

	private startMessagePolling(conversationId: number) {
		this.isPolling = true;

		this.pollingPromise = this.$interval(() => {
			this.MessageService.getConversationContentById(this.visibleConversation.conversationId).then(content => {
				this.visibleConversationContent = content;
			});
		}, 1500);
	}

	private stopMessagePolling() {
		if (this.pollingPromise) {
			this.$interval.cancel(this.pollingPromise);
		}

		this.isPolling = false;
	}
};

roomatchedApp.controller('InboxCtrl', InboxController);
