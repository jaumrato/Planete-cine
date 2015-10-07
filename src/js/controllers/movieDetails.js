app.controller( 'movieDetailsCtrl', function( $scope, Service, displayShowtimesButtons, back, $routeParams ) {

    $scope.model = Service.model;

    $scope.displayShowtimesButtons = displayShowtimesButtons;

    $scope.back = back;

    $scope.code = $routeParams.movieCode;

    Service.getMovieDetails( $scope.code );

} );