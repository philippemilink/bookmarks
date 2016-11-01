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

app.factory('BoxFactory', ['$http', '$location', '$q', function($http, $location, $q) {
	var factory = {
		boxes: [],
		getBoxes: function() {
			var deferred = $q.defer();

			$http.get(ROOT_URL + 'boxes')
				.then(function(data) {
					factory.boxes = data.data;
					deferred.resolve(factory.boxes);
				}, function(data) {
					deferred.reject(checkError($location, data));
				});

			return deferred.promise;
		},
		postBox: function(data) {
			var deferred = $q.defer();

			$http.post(ROOT_URL + 'boxes', {title: data})
				.then(function(data) {
					factory.boxes.push(data.data);
					deferred.resolve(data.data);
				}, function(data) {
					deferred.reject(checkError($location, data));
				});

			return deferred.promise;
		},
		deleteBox: function(id) {
			var deferred = $q.defer();

			$http.delete(ROOT_URL + 'boxes/' + id)
				.then(function() {
					var index = getIndex(factory.boxes, id);
					factory.boxes.splice(index, 1);
					deferred.resolve(factory.boxes);
				}, function(data) {
					deferred.reject(checkError($location, data));
				});

			return deferred.promise;
		},
		editBox: function(id, title) {
			var deferred = $q.defer();

			$http.put(ROOT_URL + 'boxes/' + id, {title: title})
				.then(function() {
					var index = getIndex(factory.boxes, id);
					factory.boxes[index].title = title;
					deferred.resolve(factory.boxes[index]);
				}, function(data) {
					deferred.reject(checkError($location, data));
				});

			return deferred.promise;
		},
		addBookmark: function(id, link) {
			var deferred = $q.defer();

			$http.post(ROOT_URL + 'boxes/' + id + '/bookmarks', {link: link})
				.then(function(data) {
					var index = getIndex(factory.boxes, id);
					factory.boxes[index].bookmarks.push(data.data);
					deferred.resolve(data.data);
				}, function(data) {
					deferred.reject(checkError($location, data));
				});

			return deferred.promise;
		},
		deleteBookmark: function(idBox, idBookmark) {
			var deferred = $q.defer();

			$http.delete(ROOT_URL + 'boxes/' + idBox + '/bookmarks/' + idBookmark)
				.then(function() {
					var indexBox = getIndex(factory.boxes, idBox);
					var indexBookmark = getIndex(factory.boxes[indexBox].bookmarks, idBookmark);
					factory.boxes[indexBox].bookmarks.splice(indexBookmark, 1);
					deferred.resolve(factory.boxes);
				}, function(data) {
					deferred.reject(checkError($location, data));
				});

			return deferred.promise;
		},
		editBookmark: function(idBox, idBookmark, link) {
			var deferred = $q.defer();

			$http.put(ROOT_URL + 'boxes/' + idBox + '/bookmarks/' + idBookmark, {link: link})
				.then(function() {
					deferred.resolve(true);
				}, function(data) {
					deferred.reject(checkError($location, data));
				});

			return deferred.promise;
		}
	};

	return factory;
}]);