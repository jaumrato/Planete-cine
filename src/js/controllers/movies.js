app.controller( 'moviesCtrl', function( $scope, Movies, Model, haveToRefresh, Service, $location ) {

    $scope.model = Model;

    $scope.getMoviesList = function() {
        $scope.loader.show( 'Chargement des films' );
        Movies.getMoviesList().then( function( resp ) {
            Movies.handleMoviesList( resp.data.feed.movie );
        }, function( err ) {
            $scope.notifier.show( {
                title: 'Une erreur est survenue',
                message: 'Impossible de récupérer la liste des films actuellement en salle.',
                close: $location.path.bind( $location, "/#/" ),
                retry: $scope.getMoviesList
            } );
        } ).finally( function() {
            $scope.loader.hide();
        } );
    };

    if ( haveToRefresh ) $scope.getMoviesList();

} );