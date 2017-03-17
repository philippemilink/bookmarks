var app = angular.module('BookmarksApp', ['ngRoute', 'LocalStorageModule']);

app.config(function($routeProvider) {
	$routeProvider.when('/', { templateUrl: 'partials/list.html', controller: 'AppController' })
		.when('/login', { templateUrl: 'partials/login.html', controller: 'LoginController' })
		.otherwise({ redirectTo: '/' });
});
