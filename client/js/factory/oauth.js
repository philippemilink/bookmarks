app.factory('OauthFactory', ['$http', '$q', 'localStorageService', '$location', function($http, $q, localStorageService, $location) {
    var factory = {
        setAccessToken: function (accessToken, expiration) {
            localStorageService.set('accessToken', accessToken);
            localStorageService.set('accessTokenExpiration', (Date.now()/1000) + expiration - 60);
        },

        getAccessToken: function () {
            var deferred = $q.defer();

            if ((Date.now()/1000) < parseInt(localStorageService.get('accessTokenExpiration'))) {
                deferred.resolve(localStorageService.get('accessToken'));
            } else {
                if ((Date.now()/1000) < parseInt(localStorageService.get('refreshTokenExpiration'))) {
                    return factory.requestAccessTokenFromRefreshToken();
                } else {
                    deferred.reject();
                }
            }
            return deferred.promise;
        },

        setRefreshToken: function (refreshToken) {
            localStorageService.set('refreshToken', refreshToken);
            localStorageService.set('refreshTokenExpiration', (Date.now()/1000) + REFRESH_TOKEN_LIFETIME - 3600);
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
                factory.setRefreshToken(data.data.refresh_token);
                deferred.resolve();
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
                deferred.resolve(data.data.access_token);
            }, function (data) {
                deferred.reject({
                    title: data.data.error,
                    message: data.data.error_description,
                    show: true
                });
            });

            return deferred.promise;
        },

        logout: function() {
            localStorageService.clearAll();
            $location.path('login');
        }
    };

    return factory;
}]);
