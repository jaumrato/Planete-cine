app.controller( 'theatersCtrl', function( $scope, Model, Theaters, Loader, Notifier, Geolocation ) {

    $scope.model = Model;

    Geolocation.startWatchPosition();

    $scope.$on( '$destroy', function() {
        Geolocation.stopWatchPosition();
    } );

    $scope.geolocationSearch = function() {
        $scope.search( 'gps', Model.position );
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
