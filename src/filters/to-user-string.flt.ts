function toUserStringFilter () {
		var userType: UserType;
		return function (userType: UserType) {
			if (userType === UserType.Visitor) {
				return 'Visitor';
			} else if (userType === UserType.Seeker) {
				return 'Seeker';
			} else if (userType === UserType.Offerer) {
				return 'Offerer';
			} else {
				return '';
			}
		};
}

roomatchedApp.filter('typeToString', toUserStringFilter);
