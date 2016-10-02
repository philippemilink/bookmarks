var ROOT_URL = "http://localhost/bookmarks/server/web/app_dev.php/";


var app = angular.module('BookmarksApp', []);



app.controller('AppController', function($scope, BoxFactory) {
	$scope.getBoxesError = false;

	BoxFactory.getBoxes().then(function(boxes) {
		$scope.boxes = boxes;
	}, function(msg) {
		$scope.getBoxesError = true;
		$scope.getBoxesErrorData = msg
	});

	$scope.postNewBoxError = false;

	$scope.addBox = function() {
		BoxFactory.postBox($scope.newBoxTitle).then(function() {
			$scope.postNewBoxError = false;
			$scope.newBoxTitle = null;
		}, function(msg) {
			$scope.postNewBoxError = true;
			$scope.postNewBoxErrorForm = msg;
			console.log(msg)
		});
	};
});