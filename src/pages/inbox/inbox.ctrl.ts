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

	constructor (private MessageService, private AuthService, private $state, private $interval) {
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
			});
		});
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
		this.$interval.cancel(this.pollingPromise);
		this.isPolling = false;
	}
};

roomatchedApp.controller('InboxCtrl', InboxController);
