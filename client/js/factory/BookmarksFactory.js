app.factory('BookmarksFactory', ['$http', '$q', function($http, $q) {
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
				.then(function(data) {
					var index = factory.boxes.findIndex(function(box) {
						return box.id == id;
					});
					factory.boxes.splice(index, 1);
					return factory.boxes;
				}).catch(function(data) {
					return data.error;
				});
		}
	};
	return factory;
}]);