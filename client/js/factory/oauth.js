app.factory('OauthFactory', ['$http', '$q', 'localStorageService', function($http, $q, localStorageService) {
    var factory = {
        setAccessToken: function (accessToken, expiration) {
            localStorageService.set('accessToken', accessToken);
            localStorageService.set('accessTokenExpiration', Date.now() + expiration - 60);
        },

        getAccessToken: function () {
            return localStorageService.get('accessToken');
        },

        setRefreshToken: function (refreshToken) {
            localStorageService.set('refreshToken', refreshToken);
            localStorageService.set('refreshTokenExpiration', Date.now() + REFRESH_TOKEN_LIFETIME - 3600);
        },

        getRefreshToken: function () {
            return localStorageService.get('refreshToken');
        },

        requestAccessToken: function (username, password) {
            var deferred = $q.defer();

            $http.post(ROOT_URL + 'oauth/v2/token', {
                grant_type: "password",
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                username: username,
                password: password
            }).then(function (data) {
                factory.setAccessToken(data.data.access_token, data.data.expires_in);
                factory.setRefreshToken(data.data.refresh_token)
                deferred.resolve(true);
            }, function (data) {
                deferred.reject({
                    title: data.data.error,
                    message: data.data.error_description,
                    show: true
                });
            });

            return deferred.promise;
        },

        requestAccessTokenFromRefreshToken: function () {
            var deferred = $q.defer();

            $http.post(ROOT_URL + 'oauth/v2/token', {
                grant_type: "refresh_token",
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                refresh_token: factory.getRefreshToken()
            }).then(function (data) {
                factory.setAccessToken(data.data.access_token, data.data.expires_in);
                factory.setRefreshToken(data.data.refresh_token)
                deferred.resolve(true);
            }, function (data) {
                deferred.reject({
                    title: data.data.error,
                    message: data.data.error_description,
                    show: true
                });
            });

            return deferred.promise;
        }
    };

    return factory;
}]);
