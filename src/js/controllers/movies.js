app.controller( 'moviesCtrl', function( $scope, Service ) {

    $scope.model = Service.model;

    // If the list of movies is null or if the list is older than 10 minutes, we get a new list.
    if ( $scope.model.nowShowingMovies === null || Date.now() - $scope.model.lastAction > 600000 ) {
        Service.getNowShowingMovies();
    }

} );