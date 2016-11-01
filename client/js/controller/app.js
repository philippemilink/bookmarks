app.controller('AppController',['$scope', 'BoxFactory', function($scope, BoxFactory) {
    $scope.error = { show: false };
    $scope.showForm = true;

    BoxFactory.getBoxes().then(function(data) {
        $scope.boxes = data;
        $scope.showForm = true;
    }, function(data) {
        $scope.error = data;
        $scope.error.show = true;
        $scope.showForm = false;
    });

    $scope.addBox = function() {
        BoxFactory.postBox($scope.newBoxTitle).then(function() {
            $scope.error.show = false;
            $scope.newBoxTitle = null;
        }, function(data) {
            $scope.error = data;
            $scope.error.show = true;
        });
    };
}]);
