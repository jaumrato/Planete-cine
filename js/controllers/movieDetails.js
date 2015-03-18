app.controller( 'movieDetailsCtrl', function( $scope, $routeParams, $sce, Service ) {

    $scope.model = Service.model;

    $scope.model.previousView = 'movieDetails';

    Service.getMovieDetails();

} );