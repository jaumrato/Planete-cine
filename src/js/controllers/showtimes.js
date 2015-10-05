app.controller( 'showtimesCtrl', function( $scope, $routeParams, Service ) {

    $scope.model = Service.model;

    Service.getShowtimeList( $routeParams.theaterCode );

    $scope.isFavoriteTheater = function() {
        var out = false;
        $scope.model.userSettings.favoriteTheaters.forEach( function( theater ) {
            if ( theater.code === $routeParams.theaterCode )
                out = true;
        } );
        return out;
    };

    $scope.addInFavoriteTheaters = function() {
        $scope.model.userSettings.favoriteTheaters.push( $scope.model.currentTheater );
        Service.saveUserSettings();
    };

    $scope.nextDay = function() {
        $scope.model.currentDay += 1;
    };

    $scope.prevDay = function() {
        $scope.model.currentDay -= 1;
    };

    $scope.removeFromFavoriteTheaters = function() {
        $scope.model.userSettings.favoriteTheaters.forEach( function( theater, index ) {
            if ( theater.code === $routeParams.theaterCode )
                $scope.model.userSettings.favoriteTheaters.splice( index, 1 );
        } );
        Service.saveUserSettings();
    };

} );