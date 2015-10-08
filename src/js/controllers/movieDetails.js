app.controller( 'movieDetailsCtrl', function( $scope, MovieDetails, Model, displayShowtimesButtons, back, $routeParams ) {

    $scope.model = Model;
    $scope.displayShowtimesButtons = displayShowtimesButtons;
    $scope.back = back;
    $scope.code = $routeParams.movieCode;

    MovieDetails.getMovieDetails( $scope.code ).then( function() {
        if ( Model.movieDetails.trailer && Model.movieDetails.trailer.code ) {
            MovieDetails.getTrailer( Model.movieDetails.trailer.code );
        }
    } );

} );