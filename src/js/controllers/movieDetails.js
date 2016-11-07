app.controller( 'movieDetailsCtrl', function( $scope, MovieDetails, Model, displayShowtimesButtons, back, $routeParams, $location, Loader, Notifier, Geolocation ) {

    $scope.model = Model;
    $scope.displayShowtimesButtons = displayShowtimesButtons;
    $scope.back = back;
    $scope.code = $routeParams.movieCode;

    Geolocation.startWatchPosition();

    $scope.$on( '$destroy', function() {
        Geolocation.stopWatchPosition();
    } );

    $scope.getMovieDetails = function() {
        Loader.show( 'Chargement des informations' );
        MovieDetails.getMovieDetails( $scope.code ).then(
            MovieDetails.handleMovieDetails.bind( MovieDetails ),
            function( err ) {
                Notifier.show( {
                    title: 'Une erreur est survenue',
                    message: 'Impossible de récupérer les informations concernant ce film.',
                    close: function() {
                        $location.path( $scope.back );
                    },
                    retry: $scope.getMovieDetails
                } );
            }
        ).finally( function() {
            Loader.hide();
        } );
    };

    $scope.showtimesByTheater = function( methode, code ){
        $location.path( "showtimesByTheater/" + methode + "/" + code );
    };

    $scope.getMovieDetails();

} );
