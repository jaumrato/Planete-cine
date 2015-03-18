app.controller( 'moviesCtrl', function( $scope, Service ) {

    $scope.model = Service.model;

    $scope.model.previousView = 'movies';

    Service.getNowShowingMovies();

} );