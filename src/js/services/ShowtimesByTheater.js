app.factory( 'ShowtimesByTheater', function( $http, Model, Service ) {

    return {

        getShowtimeList: function( movieCode, mode, position ) {
            var params = {
                favorites: {
                    count: 30,
                    movie: movieCode,
                    theaters: Model.userSettings.favoriteTheaters.map( function( theater ) {
                        return theater.code;
                    } ).join( ',' )
                },
                gps: {
                    count: 30,
                    movie: movieCode,
                    radius: 30,
                    lat: position.latitude,
                    long: position.longitude
                }
            };

            return $http.get(
                Model.BASE_URL + '/showtimelist',
                Service.getParams( params[ mode ] )
            );
        },

        handleShowtimesList: function( resp ) {
            var out = {};
            Model.showtimesDays = [];
            resp.data.feed.theaterShowtimes.forEach( function( item ) {
                item.movieShowtimes = item.movieShowtimes ||  [];
                item.movieShowtimes.forEach( function( movie ) {
                    movie.scr.forEach( function( day ) {
                        if ( Model.showtimesDays.indexOf( day.d ) === -1 ) Model.showtimesDays.push( day.d );
                        out[ day.d ] = out[ day.d ] || {};
                        if ( out[ day.d ][ item.place.theater.code ] === undefined ) {
                            out[ day.d ][ item.place.theater.code ] = item.place.theater;
                            out[ day.d ][ item.place.theater.code ].showtimes = {};
                        }
                        out[ day.d ][ item.place.theater.code ].showtimes[ Service.getShowtimeVersion( movie ) ] = day.t;
                    } );
                } );
                for ( var day in out ) {
                    var theatersList = [];
                    for ( var code in out[ day ] ) {
                        theatersList.push( out[ day ][ code ] )
                    }
                    out[ day ] = theatersList;
                }
                Model.showtimesDays = Model.showtimesDays.sort();
                Model.currentDay = Model.showtimesDays[ 0 ];
                Model.movieShowtimesByTheaters = out;
            } );
        }


    };

} );
