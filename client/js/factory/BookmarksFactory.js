function getIndex(boxes, id) {
	return boxes.findIndex(function(box) {
		return box.id == id;
	});
}

app.factory('BookmarksFactory', ['$http', function($http) {
	var factory = {
		boxes: [],
		getBoxes: function() {
			return $http.get(ROOT_URL + 'boxes')
				.then(function(data) {
					factory.boxes = data.data;
					return factory.boxes;
				}).catch(function(data) {
					return data.error;
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
		}
	};
	return factory;
}]);