app.factory( 'Movies', function( $http, Model, Service ) {

    return {

        getMoviesList: function() {
            Service.showLoader( 'Chargement des films' );
            $http.get( Model.baseURL + '/movielist', Service.getParams( {
                count: 50,
                filter: 'nowshowing',
                order: 'toprank'
            } ) ).then(
                function( resp ) {
                    Model.nowShowingMovies = resp.data.feed.movie;
                    Model.nowShowingMovies.forEach( function( movie ) {
                        if ( movie.poster && movie.poster.href ) {
                            movie.poster.href = movie.poster.href.replace( '/pictures', '/r_120_x/pictures' );
                        }
                    } );
                    Service.hideLoader();
                },
                function() {
                    Service.hideLoader();
                }
            );

        }

    };

} );