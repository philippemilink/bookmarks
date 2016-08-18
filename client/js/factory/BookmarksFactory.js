app.factory('BookmarksFactory', function($http, $q) {
	var factory = {
		boxes: [],
		getBoxes: function() {
			var deferred = $q.defer();
			$http.get(ROOT_URL + 'boxes')
				.success(function(data, status) {
					factory.boxes = data;
					deferred.resolve(factory.boxes);
				}).error(function(data, status) {
					deferred.reject(data.error);
				});
			return deferred.promise;
		},
		postBox: function(data) {
			var deferred = $q.defer();
			$http.post(ROOT_URL + 'boxes', {title: data})
				.success(function(data, status) {
					factory.boxes.push(data);
					deferred.resolve(data);
				}).error(function(data, status) {
					deferred.reject(data.children);
				});
			return deferred.promise;
		},
		deleteBox: function(id) {
			var deferred = $q.defer();
			$http.delete(ROOT_URL + 'boxes/' + id)
				.success(function(data, status) {
					var index = factory.boxes.findIndex(function(box) {
						return box.id == id;
					});
					factory.boxes.splice(index, 1);
					deferred.resolve(factory.boxes);
				}).error(function(data, status) {
					deferred.reject(data.error);
				});
			return deferred.promise;
		}
	};
	return factory;
});