app.controller( 'theatersCtrl', function( $scope, Service, cordovaGeolocationService ) {

    $scope.model = Service.model;

    $scope.launchTheaterSearchByGeolocation = function() {

        cordovaGeolocationService.getCurrentPosition( function( position ) {
            $scope.model.position = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            Service.getTheatersByGeolocation();
        }, function( e ) {
            alert( e );
        } );

    };

    $scope.launchTheaterSearch = function() {
        Service.getTheaters();
    };

} );