/**
 * error variable must have this structure:
 * - error.show: there is an error to display (boolean)
 * - error.title: would be bold in the message
 * - error.message: details of the error
 */


app.directive('ngError', function() {
    return {
        templateUrl: 'partials/error.html',
        scope: {
            error: '='
        }
    };
});
