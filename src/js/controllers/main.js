app.controller( 'mainCtrl', function( $scope, $location, Service ) {

	$scope.model = Service.model;

	$scope.$on( '$locationChangeStart', function( event, current, previous ) {
		$scope.model.previousLocation = previous;
	} );

} );