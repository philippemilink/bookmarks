app.factory('OauthFactory', function($http, $rootScope) {
    var factory = {
        accessToken: null,

        setAccessToken: function (accessToken) {
            factory.accessToken = accessToken;
            $rootScope.accessToken = accessToken;
        },

        getAccessToken: function () {
            return factory.accessToken;
        },

        requestAccessToken: function (username, password) {
            return $http.post(ROOT_URL + 'oauth/v2/token', {
                grant_type: "password",
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                username: username,
                password: password
            }).then(function (data) {
                factory.setAccessToken(data.data.access_token);
                return { valid: true };
            }, function (data) {
                return {
                    valid: false,
                    data: {
                        title: data.data.error,
                        message: data.data.error_description,
                        show: true
                    }
                };
            });
        }
    };

    return factory;
});
