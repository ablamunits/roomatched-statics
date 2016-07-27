class MessageServiceProvider {
	constructor(private $http: ng.IHttpService) {
	}

	sendMessage(from: number, to: number, content: string) {
		let message = {
			from: from,
			to: to,
			content: content
		};

		return this.$http.post(API_URI + `/messages`, message).then((r) => {
			console.log(r);
		});
	}

	getConversationContent(id1: number, id2: number, lastMessageId?: number) {
		lastMessageId = lastMessageId ? lastMessageId : 0;

		return this.$http.get(API_URI + `/messages/history?id1=${id1}&id2=${id2}&messageId=${lastMessageId}`).then(response => response.data);
	}

	getConversationContentById(conversationId: number, lastMessageId?: number) {
		lastMessageId = lastMessageId ? lastMessageId : 0;
		return this.$http.get(API_URI + `/messages/conversation?convId=${conversationId}&lastMessage=${lastMessageId}`).then(response => response.data);
	}

	getAllUserConversations(userId: number) {
		return this.$http.get(API_URI + `/messages/${userId}`).then(response => response.data);
	}
}

roomatchedApp.service('MessageService', MessageServiceProvider);
