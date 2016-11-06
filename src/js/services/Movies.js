app.factory( 'Movies', function( $http, Model, Service ) {

    return {

        getMoviesList: function() {
            return $http.get( Model.BASE_URL + '/movielist', Service.getParams( {
                count: 50,
                filter: 'nowshowing',
                order: 'toprank'
            } ) );
        },

        handleMoviesList: function( movies ) {
            Model.nowShowingMovies = movies;
        }

    };

} );
