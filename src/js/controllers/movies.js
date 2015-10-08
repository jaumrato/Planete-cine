app.controller( 'moviesCtrl', function( $scope, Movies, Model, haveToRefresh ) {

    $scope.model = Model;

    if ( haveToRefresh ) Movies.getMoviesList();

} );