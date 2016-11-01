app.controller('LoginController', function($scope, $location, OauthFactory) {
    $scope.username = null;
    $scope.password = null;
    $scope.error = { show: false };

    $scope.getToken = function() {
        OauthFactory.requestAccessToken($scope.username, $scope.password).then(function(data) {
            if (data.valid) {
                $location.path('');
            } else {
                $scope.error = data.data;
            }
        });
    }
});