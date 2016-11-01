var app = angular.module('BookmarksApp', ['ngRoute', 'LocalStorageModule']);

app.config(function($routeProvider) {
	$routeProvider.when('/', { templateUrl: 'partials/list.html', controller: 'AppController' })
		.when('/login', { templateUrl: 'partials/login.html', controller: 'LoginController' })
		.otherwise({ redirectTo: '/' });
});

app.config(function($httpProvider) {
	$httpProvider.interceptors.push(['$q', 'localStorageService', function($q, localStorageService) {
		return {
			'request': function(config) {
				config.headers.Authorization = "Bearer " + localStorageService.get('accessToken');
				return config;
			}
		};
	}]);
});
