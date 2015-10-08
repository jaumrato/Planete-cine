app.controller( 'showtimesCtrl', function( $scope, $routeParams, haveToRefresh, back, Service, Showtimes, Model ) {

    $scope.model = Model;

    $scope.back = back;

    $scope.isFavorite = Model.userSettings.favoriteTheaters.map( function( theater ) {
        return theater.code;
    } ).indexOf( $routeParams.theaterCode ) > -1;

    $scope.toggleFavorite = function() {
        if ( $scope.isFavorite ) {
            Model.userSettings.favoriteTheaters.push( Model.currentTheater );
        } else {
            var index = Model.userSettings.favoriteTheaters.indexOf( $routeParams.theaterCode );
            Model.userSettings.favoriteTheaters.splice( index, 1 );
        }
        $scope.isFavorite = !$scope.isFavorite;
        Service.saveUserSettings();
    };

    $scope.nextDay = function() {
        Model.currentDay += 1;
    };

    $scope.prevDay = function() {
        Model.currentDay -= 1;
    };

    if ( haveToRefresh ) Showtimes.getShowtimeList( $routeParams.theaterCode );

} );