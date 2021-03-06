app.controller( 'showtimesCtrl', function( $scope, $routeParams, haveToRefresh, back, Service, Showtimes, Model, Loader, Notifier, $location ) {

    $scope.model = Model;

    $scope.back = back;

    $scope.isFavorite = Model.userSettings.favoriteTheaters.map( function( theater ) {
        return theater.code;
    } ).indexOf( $routeParams.theaterCode ) > -1;

    $scope.toggleFavorite = function() {
        if ( $scope.isFavorite ) {
            var index = Model.userSettings.favoriteTheaters.map( function( theater ) {
                return theater.code;
            } ).indexOf( $routeParams.theaterCode );
            Model.userSettings.favoriteTheaters.splice( index, 1 );
        } else {
            Model.userSettings.favoriteTheaters.push( Model.currentTheater );
        }
        $scope.isFavorite = !$scope.isFavorite;
        Service.saveUserSettings();
    };

    $scope.getShowtimeList = function() {
        Loader.show( 'Chargement des séances' );
        Showtimes.getShowtimeList( $routeParams.theaterCode ).then(
            function( resp ) {
                Model.currentTheater = resp.data.feed.theaterShowtimes[ 0 ].place.theater;
                Showtimes.handleShowtimesList( resp.data.feed.theaterShowtimes[ 0 ].movieShowtimes || [] );
            },
            function( err ) {
                Notifier.show( {
                    title: 'Une erreur est survenue',
                    message: 'Impossible de récupérer la liste des séances de ce cinéma.',
                    close: $location.path.bind( $location, "/#/" ),
                    retry: $scope.getShowtimeList
                } );
            }
        ).finally( function() {
            Loader.hide();
        } );
    };

    if ( haveToRefresh ) $scope.getShowtimeList( $routeParams.theaterCode );

} );