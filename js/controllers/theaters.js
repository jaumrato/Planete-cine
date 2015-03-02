app.controller( 'theatersCtrl', function( $scope, Service ) {

    $scope.model = Service.model;

    $scope.launchTheaterSearchByGeolocation = function() {
        navigator.geolocation.getCurrentPosition( function( position ) {
            $scope.model.position = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            Service.getTheatersByGeolocation();
        } );
    };

    $scope.launchTheaterSearch = function() {
        Service.getTheaters();
    };

} );