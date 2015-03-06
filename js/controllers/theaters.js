app.controller( 'theatersCtrl', function( $scope, Service ) {

    $scope.model = Service.model;

    $scope.launchTheaterSearchByGeolocation = function() {
        navigator.geolocation.getCurrentPosition( function( position ) {
            alert( position );
            alert( $scope );
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