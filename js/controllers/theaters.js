app.controller( 'theatersCtrl', function( $scope, Service ) {

    $scope.model = Service.model;

    $scope.model.previousView = 'theaters';

    $scope.launchTheaterSearchByGeolocation = function() {

        if ( navigator.geolocation && navigator.geolocation.getCurrentPosition ) {
            navigator.geolocation.getCurrentPosition( $scope.onSuccessGeolocation, $scope.onErrorGeolocation, {
                maximumAge: 0,
                timeout: 10000,
                enableHighAccuracy: true
            } );
        } else {
            alert('no gps 1')
        }

    };

    $scope.onSuccessGeolocation = function( position ) {
        $scope.model.position = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        Service.getTheatersByGeolocation();
    };

    $scope.onErrorGeolocation = function( e ) {
        alert( e );
    };

    $scope.launchTheaterSearch = function() {
        Service.getTheaters();
    };

} );