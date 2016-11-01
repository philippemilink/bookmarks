app.controller('LoginController', ['$scope', '$location', 'OauthFactory', function($scope, $location, OauthFactory) {
    $scope.username = null;
    $scope.password = null;
    $scope.error = { show: false };

    $scope.getToken = function() {
        OauthFactory.requestAccessToken($scope.username, $scope.password)
            .then(function(data) {
                $location.path('');
            }, function(data) {
                $scope.error = data;
            });
    };
}]);