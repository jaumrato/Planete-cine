app.factory( 'MovieDetails', function( $http, Model, Service ) {

    return {

        getMovieDetails: function( code ) {
            Service.showLoader( 'Chargement des informations' );

            return $http.get( Model.baseURL + '/movie', Service.getParams( {
                mediafmt: 'mp4-lc',
                profile: 'medium',
                code: code,
                striptags: 'synopsis,synopsisshort'
            } ) ).then(
                function( resp ) {
                    Service.hideLoader();
                    Model.movieDetails = resp.data.movie;
                },
                function() {
                    Service.hideLoader();
                }
            );
        },

        getTrailer: function( code ) {
            return $http.get( Model.baseURL + '/media', Service.getParams( {
                mediafmt: 'mp4-lc',
                profile: 'medium',
                code: code
            } ) ).then( function( resp ) {
                try {
                    Model.movieDetails.trailer.url = resp.data.media.rendition[ 0 ].href;
                } catch ( err ) {
                    Model.movieDetails.trailer.url = undefined;
                }
            }.bind( this ) );
        }

    };

} );