app.service('oauth', ['$http', function($http) {
    this.accessToken = null;

    this.setAccessToken = function(accessToken) {
        this.accessToken = accessToken;
    }
    this.getAccessToken = function() {
        return this.accessToken;
    }
}]);
