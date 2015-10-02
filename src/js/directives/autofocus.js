app.directive( 'autofocus', function() {
    return {
        restrict: 'A',
        link: function( $scope, elements ) {
            elements[ 0 ].focus();
        }
    };
} );