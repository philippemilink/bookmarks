var ROOT_URL = "http://localhost/bookmarks/server/web/app_dev.php/";


var app = angular.module('BookmarksApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider.when('/', { templateUrl: 'partials/list.html', controller: 'AppController' })
		.when('/login', { templateUrl: 'partials/login.html', controller: 'LoginController' })
		.otherwise({ redirectTo: '/' });
});



app.controller('AppController', function($scope, BoxFactory) {
	$scope.getBoxesError = false;

	BoxFactory.getBoxes().then(function(data) {
		if (data.valid) {
			$scope.boxes = boxes;
		} else {
			$scope.getBoxesError = true;
			$scope.getBoxesErrorData = data;
		}
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

app.controller('LoginController', function($scope) {

});