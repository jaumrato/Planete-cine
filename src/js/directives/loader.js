app.directive( 'loader', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/loader.html',
        controller: function( $scope, Service ) {
            $scope.model = Service.model;
        }
    };
} );