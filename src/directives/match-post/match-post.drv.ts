class MatchPostDirectiveController {
	content: Match;
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
