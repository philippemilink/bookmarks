app.directive('ngBookmark', function () {
    return {
        templateUrl: 'partials/bookmark.html',
        scope: {
            bookmark: '=',
            box: '='
        },
        controller: ['$scope', 'BoxFactory', function($scope, BoxFactory) {
            $scope.showLinkStatus = true;
            $scope.showEditStatus = false;
            $scope.showDeleteStatus = false;

            $scope.newLink = $scope.bookmark.link;

            $scope.backAction = function() {
                $scope.showLinkStatus = true;
                $scope.showEditStatus = false;
                $scope.showDeleteStatus = false;
            };

            $scope.showEditAction = function() {
                $scope.showLinkStatus = false;
                $scope.showEditStatus = true;
                $scope.showDeleteStatus = false;
            };

            $scope.showDeleteAction = function() {
                $scope.showLinkStatus = false;
                $scope.showDeleteStatus = true;
                $scope.showEditStatus = false;
            };

            $scope.editBookmark = function() {
                BoxFactory.editBookmark($scope.box.id, $scope.bookmark.id, $scope.newLink).then(function() {
                    $scope.bookmark.link = $scope.newLink;
                    $scope.backAction();
                }, function(msg) {
                    console.log(msg);
                    $scope.backAction();
                });
            };

            $scope.deleteBookmark = function() {
                BoxFactory.deleteBookmark($scope.box.id, $scope.bookmark.id).then(function() {
                    $scope.backAction();
                }, function(msg) {
                    console.log(msg)
                });
            };
        }]
    }
});