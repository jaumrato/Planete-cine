app.controller( 'moviesCtrl', function( $scope, Movies, Model, haveToRefresh, $location, Loader, Notifier, Service ) {

    $scope.model = Model;

    $scope.getMoviesList = function() {
        Loader.show( 'Chargement des films' );
        Movies.getMoviesList().then( function( resp ) {
            Movies.handleMoviesList( resp.data.feed.movie );
        }, function( err ) {
            Notifier.show( {
                title: 'Une erreur est survenue',
                message: 'Impossible de récupérer la liste des films actuellement en salle.',
                close: $location.path.bind( $location, "/#/" ),
                retry: $scope.getMoviesList
            } );
        } ).finally( function() {
            Loader.hide();
        } );
    };

    $scope.saveSortBy = function() {
        Service.saveUserSettings();
    };

    if ( haveToRefresh ) $scope.getMoviesList();

} );
