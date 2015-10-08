app.controller( 'showtimesByTheaterCtrl', function( $scope, $routeParams, Model, ShowtimesByTheater ) {

    $scope.model = Model;

    $scope.searchMode = $routeParams.searchMode;

    $scope.geolocationSearch = function() {
        try {
            navigator.geolocation.getCurrentPosition(
                $scope.onSuccessGeolocation,
                $scope.onErrorGeolocation,
                Model.geolocationParams
            );
        } catch ( err ) {
            $scope.onErrorGeolocation();
        }
    };

    $scope.onSuccessGeolocation = function( position ) {
        ShowtimesByTheater.getShowtimeList( $routeParams.movieCode, $routeParams.searchMode, position.coords );
    };

    $scope.onErrorGeolocation = function() {
        navigator.notification.confirm( "La recherche géolocalisée nécessite l'activation du GPS.",
            function( index ) {
                if ( index === 1 ) $scope.geolocationSearch();
            },
            "Activation du GPS", [ "Réessayer", "Annuler" ]
        );
    };

    if ( $routeParams.searchMode === 'gps' ) {
        $scope.geolocationSearch();
    } else if ( $routeParams.searchMode === 'favorites' ) {
        ShowtimesByTheater.getShowtimeList( $routeParams.movieCode, $routeParams.searchMode, {} );
    }

} );