app.controller( 'movieDetailsCtrl', function( $scope, $routeParams, $sce, Service ) {

    $scope.model = Service.model;

    Service.getMovieDetails();

} );