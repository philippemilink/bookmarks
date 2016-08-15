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

			$scope.showDeleteAction = function() {
				$scope.showTitleStatus = false;
				$scope.showDeleteStatus = true;
			}

			$scope.cancelDeleteAction = function() {
				$scope.showTitleStatus = true;
				$scope.showDeleteStatus = false;
			}

			$scope.deleteBox = function() {
				BookmarksFactory.deleteBox($scope.box.id).then(function(data) {
					$scope.cancelDeleteAction();
				}, function(msg) {
					console.log(msg)
				});
			}
		}
	}
})