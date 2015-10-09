app.controller( 'theatersCtrl', function( $scope, Model, Theaters ) {

    $scope.model = Model;

    $scope.geolocationSearch = function() {
        try {
            navigator.geolocation.getCurrentPosition(
                $scope.onSuccessGeolocation,
                $scope.onErrorGeolocation,
                Model.geolocationParams
            );
        } catch ( err ) {
            $scope.onErrorGeolocation();
        }
    };

    $scope.onSuccessGeolocation = function( position ) {
        Theaters.search( 'gps', position.coords );
    };

    $scope.onErrorGeolocation = function() {
        navigator.notification.confirm( "La recherche géolocalisée nécessite l'activation du GPS.",
            function( index ) {
                if ( index === 1 ) $scope.geolocationSearch();
            },
            "Activation du GPS", [ "Réessayer", "Annuler" ]
        );
    };

    $scope.onKeyPress = function( e ) {
        if ( e.charCode === 13 ) {
            console.log( Theaters );
            Theaters.search( 'text', Model.searchTheaterText );
        }
    };

} );