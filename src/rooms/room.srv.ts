class RoomServiceProvider {
	constructor(private $http: ng.IHttpService){
	}

	updateRoom(id: number, room: Room) {
		return this.$http.post(API_URI + `/room/${id}`, room).then((r) => {
			console.log('room update ok?');
		});
	}
}

roomatchedApp.service('RoomService', RoomServiceProvider);
