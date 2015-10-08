app.controller( 'showtimesCtrl', function( $scope, $routeParams, haveToRefresh, back, Service, Showtimes, Model ) {

    $scope.model = Model;

    $scope.back = back;

    if ( haveToRefresh ) Showtimes.getShowtimeList( $routeParams.theaterCode );

    $scope.isFavoriteTheater = function() {
        var out = false;
        Model.userSettings.favoriteTheaters.forEach( function( theater ) {
            if ( theater.code === $routeParams.theaterCode )
                out = true;
        } );
        return out;
    };

    $scope.addInFavoriteTheaters = function() {
        Model.userSettings.favoriteTheaters.push( Model.currentTheater );
        Service.saveUserSettings();
    };

    $scope.nextDay = function() {
        Model.currentDay += 1;
    };

    $scope.prevDay = function() {
        Model.currentDay -= 1;
    };

    $scope.removeFromFavoriteTheaters = function() {
        Model.userSettings.favoriteTheaters.forEach( function( theater, index ) {
            if ( theater.code === $routeParams.theaterCode )
                Model.userSettings.favoriteTheaters.splice( index, 1 );
        } );
        Service.saveUserSettings();
    };

} );