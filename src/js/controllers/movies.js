app.controller( 'moviesCtrl', function( $scope, Service ) {

    $scope.model = Service.model;

    $scope.state = "movies";

    if ( $scope.model.previousView !== 'showtimesByTheater' ) {
        Service.getNowShowingMovies();
    }

    $scope.model.previousView = 'movies';

} );