app.controller( 'showtimesCtrl', function( $scope, $routeParams, haveToRefresh, back, Service, Showtimes, Model ) {

    $scope.model = Model;

    $scope.back = back;

    $scope.isFavorite = Model.userSettings.favoriteTheaters.map( function( theater ) {
        return theater.code;
    } ).indexOf( $routeParams.theaterCode ) > -1;

    $scope.toggleFavorite = function() {
        if ( $scope.isFavorite ) {
            var index = Model.userSettings.favoriteTheaters.indexOf( $routeParams.theaterCode );
            Model.userSettings.favoriteTheaters.splice( index, 1 );
        } else {
            Model.userSettings.favoriteTheaters.push( Model.currentTheater );
        }
        $scope.isFavorite = !$scope.isFavorite;
        Service.saveUserSettings();
    };

    if ( haveToRefresh ) Showtimes.getShowtimeList( $routeParams.theaterCode );

} );