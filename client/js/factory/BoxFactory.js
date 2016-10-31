function getIndex(array, id) {
	return array.findIndex(function(item) {
		return item.id == id;
	});
}

function checkError($location, error) {
	var code = error.status;
	var message;
	switch (code) {
		case 401:
			message = "Unauthorized";
			$location.path('login');
			break;
		case 500:
			message = "Internal Server Error";
			break;
		default:
			message = "Error";
			break;
	}

	return {
		valid: false,
		title: code,
		message: message
	};
}

app.factory('BoxFactory', ['$http', '$location', function($http, $location) {
	var factory = {
		boxes: [],
		getBoxes: function() {
			return $http.get(ROOT_URL + 'boxes').then(function(data) {
					factory.boxes = data.data;
					return {
                        valid: true,
                        data: factory.boxes
                    };
				}, function(data) {
					return checkError($location, data);
				});
		},
		postBox: function(data) {
			return $http.post(ROOT_URL + 'boxes', {title: data})
				.then(function(data) {
					factory.boxes.push(data.data);
					return data.data;
				}).catch(function(data) {
					return data;
				});
		},
		deleteBox: function(id) {
			return $http.delete(ROOT_URL + 'boxes/' + id)
				.then(function() {
					var index = getIndex(factory.boxes, id);
					factory.boxes.splice(index, 1);
					return factory.boxes;
				}).catch(function(data) {
					return data.error;
				});
		},
		editBox: function(id, title) {
			return $http.put(ROOT_URL + 'boxes/' + id, {title: title})
				.then(function() {
					var index = getIndex(factory.boxes, id);
					factory.boxes[index].title = title;
					return factory.boxes[index];
				}).catch(function(data) {
					return data;
				});
		},
		addBookmark: function(id, link) {
			return $http.post(ROOT_URL + 'boxes/' + id + '/bookmarks', {link: link})
				.then(function(data) {
					var index = getIndex(factory.boxes, id);
					factory.boxes[index].bookmarks.push(data.data);
					return data.data;
				}).catch(function(data) {
					return data;
				});
		},
		deleteBookmark: function(idBox, idBookmark) {
			return $http.delete(ROOT_URL + 'boxes/' + idBox + '/bookmarks/' + idBookmark)
				.then(function() {
					var indexBox = getIndex(factory.boxes, idBox);
					var indexBookmark = getIndex(factory.boxes[indexBox].bookmarks, idBookmark);
					factory.boxes[indexBox].bookmarks.splice(indexBookmark, 1);
					return factory.boxes;
				}).catch(function(data) {
					return data.error;
				});
		}
	};
	return factory;
}]);