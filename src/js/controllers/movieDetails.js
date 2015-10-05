app.controller( 'movieDetailsCtrl', function( $scope, Service, $routeParams ) {

	$scope.model = Service.model;

	$scope.code = $routeParams.movieCode;

	Service.getMovieDetails( $scope.code );

} );