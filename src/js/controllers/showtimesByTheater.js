app.controller( 'showtimesByTheaterCtrl', function( $scope, $routeParams, Model, ShowtimesByTheater, $location, Loader, Notifier ) {

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
        $scope.search( $routeParams.movieCode, $routeParams.searchMode, position.coords );
    };

    $scope.onErrorGeolocation = function() {
        Notifier.show( {
            title: 'Activation du GPS',
            message: "La recherche géolocalisée nécessite l'activation du GPS.",
            close: function() {
                $location.path( "movieDetails" );
            },
            retry: $scope.geolocationSearch
        } );
    };

    $scope.search = function( code, mode, position ) {
        Loader.show( 'Chargement des séances' );
        ShowtimesByTheater.getShowtimeList( code, mode, position ).then(
            ShowtimesByTheater.handleShowtimesList.bind( ShowtimesByTheater ),
            function() {
                Notifier.show( {
                    title: 'Une erreur est survenue',
                    message: 'Impossible de récupérer la liste des séances correspondant à ce film.',
                    close: function() {
                        $location.path( "movieDetails" );
                    },
                    retry: $scope.search.bind( $scope, code, mode, position )
                } );
            }
        ).finally( function() {
            Loader.hide();
        } );
    }

    if ( $routeParams.searchMode === 'gps' ) {
        $scope.geolocationSearch();
    } else if ( $routeParams.searchMode === 'favorites' ) {
        $scope.search( $routeParams.movieCode, $routeParams.searchMode, {} );
    }

} );