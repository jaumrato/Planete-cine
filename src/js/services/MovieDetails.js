app.factory( 'MovieDetails', function( $http, Model, Service ) {

    return {

        getMovieDetails: function( code ) {
            return $http.get( Model.BASE_URL + '/moie', Service.getParams( {
                mediafmt: 'mp4-lc',
                profile: 'medium',
                code: code,
                striptags: 'synopsis,synopsisshort'
            } ) );
        },

        handleMovieDetails: function( resp ) {
            Model.movieDetails = resp.data.movie;
            if ( Model.movieDetails.trailer && Model.movieDetails.trailer.code ) {
                this.getTrailer( Model.movieDetails.trailer.code );
            }
        },

        getTrailer: function( code ) {
            $http.get( Model.BASE_URL + '/media', Service.getParams( {
                mediafmt: 'mp4-lc',
                profile: 'medium',
                code: code
            } ) ).then( function( resp ) {
                try {
                    Model.movieDetails.trailer.url = resp.data.media.rendition[ 0 ].href;
                } catch ( err ) {
                    Model.movieDetails.trailer.url = undefined;
                }
            } );
        }

    };

} );