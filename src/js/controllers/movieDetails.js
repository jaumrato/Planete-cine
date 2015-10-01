app.controller( 'movieDetailsCtrl', function( $scope, Service, $routeParams ) {

    $scope.model = Service.model;

    $scope.state = 'movie-details';

    $scope.model.previousView = 'movieDetails';

    Service.getMovieDetails();

} );