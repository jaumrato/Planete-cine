app.controller( 'moviesCtrl', function( $scope, Service ) {

    $scope.model = Service.model;

    Service.getNowShowingMovies();

} );