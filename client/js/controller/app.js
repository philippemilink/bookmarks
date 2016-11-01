app.controller('AppController', function($scope, BoxFactory) {
    $scope.getBoxesError = { show: false };

    BoxFactory.getBoxes().then(function(data) {
        if (data.valid) {
            $scope.boxes = data.data;
        } else {
            $scope.getBoxesError = data;
            $scope.getBoxesError.show = true;
        }
    });

    $scope.postNewBoxError = false;

    $scope.addBox = function() {
        BoxFactory.postBox($scope.newBoxTitle).then(function() {
            $scope.postNewBoxError = false;
            $scope.newBoxTitle = null;
        }, function(msg) {
            $scope.postNewBoxError = true;
            $scope.postNewBoxErrorForm = msg;
            console.log(msg)
        });
    };
});
