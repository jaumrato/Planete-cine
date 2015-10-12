app.controller( 'movieDetailsCtrl', function( $scope, MovieDetails, Model, displayShowtimesButtons, back, $routeParams, $location ) {

    $scope.model = Model;
    $scope.displayShowtimesButtons = displayShowtimesButtons;
    $scope.back = back;
    $scope.code = $routeParams.movieCode;

    $scope.getMovieDetails = function() {
        $scope.loader.show( 'Chargement des informations' );
        MovieDetails.getMovieDetails( $scope.code ).then(
            MovieDetails.handleMovieDetails.bind( MovieDetails ),
            $scope.notifyError
        ).finally( function() {
            $scope.loader.hide();
        } );
    };

    $scope.notifyError = function( err ) {
        $scope.notifier.show( {
            title: 'Une erreur est survenue',
            message: 'Impossible de récupérer les informations concernant ce film.',
            close: $location.path.bind( $location, $scope.back ),
            retry: $scope.getMovieDetails
        } );
    };

    $scope.getMovieDetails();

} );