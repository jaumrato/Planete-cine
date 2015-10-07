app.controller( 'showtimesByTheaterCtrl', function( $scope, $routeParams, Service ) {

    $scope.model = Service.model;

    $scope.code = $routeParams.movieCode;

    $scope.searchMode = $routeParams.searchMode;

    $scope.getShowtimesListForAMovie = function() {
        if ( $routeParams.searchMode === 'gps' ) {
            if ( navigator.geolocation && navigator.geolocation.getCurrentPosition ) {
                navigator.geolocation.getCurrentPosition( $scope.onSuccessGeolocation, $scope.onErrorGeolocation, {
                    maximumAge: 0,
                    timeout: 1000,
                    enableHighAccuracy: true
                } );
            } else {
                $scope.onErrorGeolocation();
            }
        } else if ( $routeParams.searchMode === 'favorites' ) {
            Service.getShowtimesListForAMovie( $routeParams.movieCode, $routeParams.searchMode );
        }
    };

    $scope.onSuccessGeolocation = function( position ) {
        $scope.model.position = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        Service.getShowtimesListForAMovie( $routeParams.movieCode, $routeParams.searchMode );
    };

    $scope.onErrorGeolocation = function() {
        var message = "L'activation du GPS est nécessaire afin de trouver les cinémas proposant ce film autour de vous.",
            title = "Activation du GPS",
            buttonLabels = [ "Réessayer", "Annuler" ];
        navigator.notification.confirm( message, function( index ) {
            if ( index === 1 ) {
                $scope.getShowtimesListForAMovie();
            }
        }, title, buttonLabels );
    };

    $scope.nextDay = function() {
        $scope.model.currentDay += 1;
    };

    $scope.prevDay = function() {
        $scope.model.currentDay -= 1;
    };

    $scope.getShowtimesListForAMovie();

} );