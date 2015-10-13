app.controller( 'theatersCtrl', function( $scope, Model, Theaters, Loader, Notifier ) {

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
        $scope.search( 'gps', position.coords );
    };

    $scope.onErrorGeolocation = function() {
        Notifier.show( {
            title: 'Activation du GPS',
            message: "La recherche géolocalisée nécessite l'activation du GPS.",
            retry: $scope.geolocationSearch
        } );
    };

    $scope.onKeyPress = function( e ) {
        if ( e.charCode === 13 ) {
            $scope.search( 'text', Model.searchTheaterText );
        }
    };

    $scope.search = function( mode, search ) {
        Loader.show( 'Chargement des cinémas' );
        Theaters.search( mode, search ).then(
            function( resp ) {
                Theaters.handleTheatersList( resp.data.feed.theater );
            },
            function( err ) {
                Notifier.show( {
                    title: 'Une erreur est survenue',
                    message: 'Impossible de récupérer la liste des cinémas correspondant à votre recherche.',
                    retry: $scope.search.bind( $scope, mode, search )
                } );
            }
        ).finally( function() {
            Loader.hide();
        } );
    };

} );