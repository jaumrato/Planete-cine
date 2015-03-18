app.controller( 'moviesCtrl', function( $scope, Service ) {

    $scope.model = Service.model;

    if ( $scope.model.previousView !== 'showtimesByTheater' ) {
        Service.getNowShowingMovies();
    }

    $scope.model.previousView = 'movies';

} );