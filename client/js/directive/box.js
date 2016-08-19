app.directive('ngBox', function() {
	return {
		templateUrl: 'partials/box.html',
		scope: {
			box: '=',
			boxes: '='
		},
		controller: function($scope, BookmarksFactory) {
			$scope.showTitleStatus = true;
			$scope.showDeleteStatus = false;
			$scope.showEditStatus = false;

			$scope.newTitle = $scope.box.title;
			$scope.newLink = null;

			$scope.showDeleteAction = function() {
				$scope.showTitleStatus = false;
				$scope.showDeleteStatus = true;
				$scope.showEditStatus = false;
			}

			$scope.backAction = function() {
				$scope.showTitleStatus = true;
				$scope.showDeleteStatus = false;
				$scope.showEditStatus = false;
			}

			$scope.deleteBox = function() {
				BookmarksFactory.deleteBox($scope.box.id).then(function(data) {
					$scope.backAction();
				}, function(msg) {
					console.log(msg)
				});
			}

			$scope.showEditAction = function() {
				$scope.showTitleStatus = false;
				$scope.showDeleteStatus = false;
				$scope.showEditStatus = true;
			}

			$scope.editBox = function() {
				BookmarksFactory.editBox($scope.box.id, $scope.newTitle).then(function(data) {
					$scope.backAction();
				}, function(msg) {
					console.log(msg)
				});
			}

			$scope.addBookmark = function() {
				BookmarksFactory.addBookmark($scope.box.id, $scope.newLink).then(function(data) {
					$scope.newLink = null;
				}, function(msg) {
					console.log(msg)
				});
			}


		}
	}
})