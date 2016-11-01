app.factory('OauthFactory', function($http, $q, localStorageService) {
    var factory = {
        accessToken: null,

        setAccessToken: function (accessToken) {
            factory.accessToken = accessToken;
            localStorageService.set('accessToken', accessToken);
        },

        getAccessToken: function () {
            return factory.accessToken;
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
                factory.setAccessToken(data.data.access_token);
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
});
