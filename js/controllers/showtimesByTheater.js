app.controller( 'showtimesByTheaterCtrl', function( $scope, $routeParams, Service ) {

    $scope.model = Service.model;

    $scope.model.movieShowtimesByTheaters = {};

    $scope.model.previousView = 'showtimesByTheater';

    $scope.getShowtimesListForAMovie = function() {
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
        Service.getShowtimesListForAMovie( $routeParams.movieCode );
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