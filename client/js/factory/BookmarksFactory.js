app.factory('BookmarksFactory', function($http, $q) {
	var factory = {
		boxes: [],
		getBoxes: function() {
			var deferred = $q.defer();
			$http.get(ROOT_URL + 'boxes')
				.success(function(data, status) {
					boxes = data;
					deferred.resolve(boxes);
				}).error(function(data, status) {
					deferred.reject(data.error);
				});
			return deferred.promise;
		},
		postBox: function(data) {
			var deferred = $q.defer();
			$http.post(ROOT_URL + 'boxes', {title: data})
				.success(function(data, status) {
					boxes.push(data);
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
					newBoxes = [];
					console.log(id);
					for (var i = 0; i < boxes.length; i++) {
						if (boxes[i].id!=id) {
							newBoxes.push(boxes[i]);
						}
					}
					boxes = newBoxes;
					console.log(boxes);
					deferred.resolve(boxes);
				}).error(function(data, status) {
					deferred.reject(data.error);
				});
			return deferred.promise;
		}
	};
	return factory;
});