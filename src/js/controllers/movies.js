app.controller( 'moviesCtrl', function( $scope, Service, haveToRefresh ) {

    $scope.model = Service.model;

    if ( haveToRefresh ) Service.getNowShowingMovies();

} );