app.directive( 'offline', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/offline.html',
        controller: function( $scope, Model, $window ) {

            $scope.online = navigator.onLine;

            $window.addEventListener( "offline", function() {
                $scope.$apply( function() {
                    $scope.online = false;
                } );
            }, false );

            $window.addEventListener( "online", function() {
                $scope.$apply( function() {
                    $scope.online = true;
                } );
            }, false );
        }
    };
} );