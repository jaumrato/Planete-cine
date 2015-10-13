app.directive( 'notifier', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/notifier.html',
        controller: function( $scope, Model ) {
            $scope.model = Model;
        }
    };
} );