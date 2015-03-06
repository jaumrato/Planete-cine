app.controller( 'showtimesByTheaterCtrl', function( $scope, $routeParams, Service ) {

    $scope.model = Service.model;

    this.showLoader( 'Chargement des séances' );

    navigator.geolocation.getCurrentPosition( function( position ) {
        $scope.model.position = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        Service.getShowtimesListForAMovie( $routeParams.movieCode );
    }, function( e ) {
        alert( e );
    }, {
        enableHighAccuracy: true
    } );

    $scope.nextDay = function() {
        $scope.model.currentDay += 1;
    };

    $scope.prevDay = function() {
        $scope.model.currentDay -= 1;
    };

} );