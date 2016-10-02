app.factory('BookmarkFactory', ['$http', function($http) {
    var factory = {
        editBookmark: function(idBox, idBookmark, link) {
            return $http.put(ROOT_URL + 'boxes/' + idBox + '/bookmarks/' + idBookmark, {link: link})
                .then(function() {
                    return true;
                }).catch(function(data) {
                    return data;
                });
        }
    };

    return factory;
}]);
