function getIndex(array, id) {
	return array.findIndex(function(item) {
		return item.id == id;
	});
}

function checkError($location, error) {
	if (error.status==401) {
		$location.path('login');
	}
	return {
		title: error.status,
		message: error.statusText
	};
}

app.factory('BoxFactory', ['$http', '$location', '$q', 'OauthFactory', function($http, $location, $q, OauthFactory) {
	var factory = {
		boxes: [],
		getBoxes: function() {
			return OauthFactory.getAccessToken().then(function(accessToken) {
				var deferred = $q.defer();

				$http.get(ROOT_URL + 'boxes', { headers: { Authorization: "Bearer " + accessToken } })
					.then(function(data) {
						factory.boxes = data.data;
						deferred.resolve(factory.boxes);
					}, function(data) {
						deferred.reject(checkError($location, data));
					});

				return deferred.promise;
			}, function() {
				$location.path('login');
			});
		},
		postBox: function(data) {
			return OauthFactory.getAccessToken().then(function(accessToken) {
				var deferred = $q.defer();

				$http.post(ROOT_URL + 'boxes', {title: data}, { headers: { Authorization: "Bearer " + accessToken } })
					.then(function(data) {
						factory.boxes.push(data.data);
						deferred.resolve(data.data);
					}, function(data) {
						deferred.reject(checkError($location, data));
					});

				return deferred.promise;
			}, function() {
				$location.path('login');
			});
		},
		deleteBox: function(id) {
			return OauthFactory.getAccessToken().then(function(accessToken) {
				var deferred = $q.defer();

				$http.delete(ROOT_URL + 'boxes/' + id, { headers: { Authorization: "Bearer " + accessToken } })
					.then(function() {
						var index = getIndex(factory.boxes, id);
						factory.boxes.splice(index, 1);
						deferred.resolve(factory.boxes);
					}, function(data) {
						deferred.reject(checkError($location, data));
					});

				return deferred.promise;
			}, function() {
				$location.path('login');
			});
		},
		editBox: function(id, title) {
			return OauthFactory.getAccessToken().then(function(accessToken) {
				var deferred = $q.defer();

				$http.put(ROOT_URL + 'boxes/' + id, {title: title}, { headers: { Authorization: "Bearer " + accessToken } })
					.then(function() {
						var index = getIndex(factory.boxes, id);
						factory.boxes[index].title = title;
						deferred.resolve(factory.boxes[index]);
					}, function(data) {
						deferred.reject(checkError($location, data));
					});

				return deferred.promise;
			}, function() {
				$location.path('login');
			});
		},
		addBookmark: function(id, link) {
			return OauthFactory.getAccessToken().then(function(accessToken) {
				var deferred = $q.defer();

				$http.post(ROOT_URL + 'boxes/' + id + '/bookmarks', {link: link}, { headers: { Authorization: "Bearer " + accessToken } })
					.then(function(data) {
						var index = getIndex(factory.boxes, id);
						factory.boxes[index].bookmarks.push(data.data);
						deferred.resolve(data.data);
					}, function(data) {
						deferred.reject(checkError($location, data));
					});

				return deferred.promise;
			}, function() {
				$location.path('login');
			});
		},
		deleteBookmark: function(idBox, idBookmark) {
			return OauthFactory.getAccessToken().then(function(accessToken) {
				var deferred = $q.defer();

				$http.delete(ROOT_URL + 'boxes/' + idBox + '/bookmarks/' + idBookmark, { headers: { Authorization: "Bearer " + accessToken } })
					.then(function() {
						var indexBox = getIndex(factory.boxes, idBox);
						var indexBookmark = getIndex(factory.boxes[indexBox].bookmarks, idBookmark);
						factory.boxes[indexBox].bookmarks.splice(indexBookmark, 1);
						deferred.resolve(factory.boxes);
					}, function(data) {
						deferred.reject(checkError($location, data));
					});

				return deferred.promise;
			}, function() {
				$location.path('login');
			});
		},
		editBookmark: function(idBox, idBookmark, link) {
			return OauthFactory.getAccessToken().then(function(accessToken) {
				var deferred = $q.defer();

				$http.put(ROOT_URL + 'boxes/' + idBox + '/bookmarks/' + idBookmark, {link: link}, { headers: { Authorization: "Bearer " + accessToken } })
					.then(function(data) {
						deferred.resolve(data.data);
					}, function(data) {
						deferred.reject(checkError($location, data));
					});

				return deferred.promise;
			}, function() {
				$location.path('login');
			});
		}
	};

	return factory;
}]);