app.directive('ngBox', function() {
	return {
		templateUrl: 'partials/box.html',
		scope: {
			box: '=',
		},
		controller: ['$scope', 'BoxFactory', function($scope, BoxFactory) {
			$scope.showTitleStatus = true;
			$scope.showDeleteStatus = false;
			$scope.showEditStatus = false;
			$scope.showTools = false;

			$scope.newTitle = $scope.box.title;
			$scope.newLink = null;

			$scope.showDeleteAction = function() {
				$scope.showTitleStatus = false;
				$scope.showDeleteStatus = true;
				$scope.showEditStatus = false;
			};

			$scope.backAction = function() {
				$scope.showTitleStatus = true;
				$scope.showDeleteStatus = false;
				$scope.showEditStatus = false;
			};

			$scope.deleteBox = function() {
				BoxFactory.deleteBox($scope.box.id).then(function() {
					$scope.backAction();
				}, function(data) {
					alert(data);
				});
			};

			$scope.showEditAction = function() {
				$scope.showTitleStatus = false;
				$scope.showDeleteStatus = false;
				$scope.showEditStatus = true;
			};

			$scope.editBox = function() {
				BoxFactory.editBox($scope.box.id, $scope.newTitle).then(function() {
					$scope.backAction();
				}, function(data) {
					alert(data);
				});
			};

			$scope.addBookmark = function() {
				BoxFactory.addBookmark($scope.box.id, $scope.newLink).then(function() {
					$scope.newLink = null;
				}, function(data) {
					alert(data);
				});
			};

			$scope.mouseEnter = function() {
				$scope.showTools = true;
			};

			$scope.mouseLeave = function() {
				$scope.showTools = false;
			};
		}]
	}
});