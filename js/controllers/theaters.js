app.controller( 'theatersCtrl', function( $scope, Service ) {

    $scope.model = Service.model;

    $scope.model.previousView = 'theaters';

    $scope.launchTheaterSearchByGeolocation = function() {

        if ( navigator.geolocation && navigator.geolocation.getCurrentPosition ) {
            navigator.geolocation.getCurrentPosition( function( position ) {
                $scope.model.position = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                Service.getTheatersByGeolocation();
            }, function( e ) {
                alert( e );
            }, {
                enableHighAccuracy: true
            } );
        } else {
            navigator.notification.alert(
                "La fonction de recherche géolocalisée nécessite l'activation du GPS.",
                function() {},
                "Activation du GPS requise",
                "OK"
            );
        }

    };

    $scope.launchTheaterSearch = function() {
        Service.getTheaters();
    };

} );