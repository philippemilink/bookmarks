app.directive('ngBookmark', function () {
    return {
        templateUrl: 'partials/bookmark.html',
        scope: {
            bookmark: '=',
            box: '='
        },
        controller: function($scope, BookmarkFactory) {
            $scope.showLinkStatus = true;
            $scope.showEditStatus = false;

            $scope.newLink = $scope.bookmark.link;

            $scope.backAction = function() {
                $scope.showLinkStatus = true;
                $scope.showEditStatus = false;
            };

            $scope.showEditAction = function() {
                $scope.showLinkStatus = false;
                $scope.showEditStatus = true;
            };

            $scope.editBookmark = function() {
                BookmarkFactory.editBookmark($scope.box.id, $scope.bookmark.id, $scope.newLink).then(function() {
                    $scope.bookmark.link = $scope.newLink;
                    $scope.backAction();
                }, function(msg) {
                    console.log(msg);
                    $scope.backAction();
                });
            }
        }
    }
});