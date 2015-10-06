app.controller( 'moviesCtrl', function( $scope, Service, haveToRefresh ) {

	$scope.model = Service.model;

    console.log( haveToRefresh );

	Service.getNowShowingMovies();

} );