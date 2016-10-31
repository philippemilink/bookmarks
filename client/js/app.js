var ROOT_URL = "http://localhost/bookmarks/server/web/app_dev.php/";
var CLIENT_ID = "1_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4";
var CLIENT_SECRET = "4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k";


var app = angular.module('BookmarksApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider.when('/', { templateUrl: 'partials/list.html', controller: 'AppController' })
		.when('/login', { templateUrl: 'partials/login.html', controller: 'LoginController' })
		.otherwise({ redirectTo: '/' });
});



app.controller('AppController', function($scope, BoxFactory) {
	$scope.getBoxesError = { show: false };

	BoxFactory.getBoxes().then(function(data) {
		if (data.valid) {
			$scope.boxes = data.data;
		} else {
			$scope.getBoxesError = data;
			$scope.getBoxesError.show = true;
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

app.controller('LoginController', function($scope, $http, $location, oauth) {
	$scope.username = null;
	$scope.password = null;
	$scope.error = { show: false };

	$scope.getToken = function() {
		$http.post(ROOT_URL + 'oauth/v2/token', {
				grant_type: "password",
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET,
				username: $scope.username,
				password: $scope.password
			}).then(function(data) {
				oauth.setAccessToken(data.data.access_token);
				$location.path('');
			}, function(data) {
				$scope.error.title = data.data.error;
				$scope.error.message = data.data.error_description;
				$scope.error.show = true;
			});
	}
});