app.controller( 'theatersCtrl', function( $scope, Service ) {

    $scope.model = Service.model;

    $scope.model.previousView = 'theaters';

    $scope.launchTheaterSearchByGeolocation = function() {
        if ( navigator.geolocation && navigator.geolocation.getCurrentPosition ) {
            navigator.geolocation.getCurrentPosition( $scope.onSuccessGeolocation, $scope.onErrorGeolocation, {
                maximumAge: 0,
                timeout: 1000,
                enableHighAccuracy: true
            } );
        } else {
            $scope.onErrorGeolocation();
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
        var message = "La recherche géolocalisée nécessite l'activation du GPS.",
            title = "Activation du GPS",
            buttonLabels = ["Réessayer", "Annuler"];
        navigator.notification.confirm( message, function( index ){
            alert( index )
        }, title, buttonLabels );
    };

    $scope.launchTheaterSearch = function() {
        Service.getTheaters();
    };

} );