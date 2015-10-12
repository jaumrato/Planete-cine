app.factory( 'Showtimes', function( $http, Model, Service ) {

    return {

        getShowtimeList: function( code ) {
            Service.showLoader( 'Chargement des séances' );
            $http.get( Model.baseURL + '/showtimelist', Service.getParams( {
                profile: 'medium',
                theaters: code
            } ) ).then(
                function( resp ) {
                    Model.currentTheater = resp.data.feed.theaterShowtimes[ 0 ].place.theater;
                    this.handleShowtimesList( resp.data.feed.theaterShowtimes[ 0 ].movieShowtimes );
                    Service.hideLoader();
                }.bind( this ),
                function() {
                    Service.hideLoader();
                }
            );
        },

        handleShowtimesList: function( movies ) {
            var out = {};
            Model.showtimesDays = [];
            movies.forEach( function( movie ) {
                movie.scr.forEach( function( day ) {
                    if ( Model.showtimesDays.indexOf( day.d ) === -1 ) Model.showtimesDays.push( day.d );
                    out[ day.d ] = out[ day.d ] || {};
                    if ( out[ day.d ][ movie.onShow.movie.title ] === undefined ) {
                        movie.onShow.movie.poster = movie.onShow.movie.poster || {
                            href: ""
                        };
                        out[ day.d ][ movie.onShow.movie.title ] = {
                            showtimes: {},
                            title: movie.onShow.movie.title,
                            code: movie.onShow.movie.code,
                            thumbnail: movie.onShow.movie.poster.href.replace( '/pictures', '/r_120_x/pictures' ),
                            runtime: movie.onShow.movie.runtime
                        };
                    }
                    var version = Service.getShowtimeVersion( movie );
                    out[ day.d ][ movie.onShow.movie.title ].showtimes[ version ] = day.t;
                } );
            } );
            Model.showtimesDays.sort();
            Model.currentDay = Model.showtimesDays[ 0 ];
            Model.moviesShowtimesForATheater = out;
        }

    };

} );