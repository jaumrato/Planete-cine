app.factory( 'ShowtimesByTheater', function( $http, Model, Service ) {

    return {

        getShowtimeList: function( movieCode, mode, position ) {
            Service.showLoader( 'Chargement des séances' );

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

            $http.get(
                Model.BASE_URL + '/showtimelist',
                Service.getParams( params[ mode ] )
            ).then(
                function( resp ) {
                    this.handleShowtimesList( resp.data.feed.theaterShowtimes );
                    Service.hideLoader();
                }.bind( this ),
                function() {
                    Service.hideLoader();
                }
            );
        },

        handleShowtimesList: function( theaters ) {
            var out = {};
            Model.showtimesDays = [];
            theaters.forEach( function( item ) {
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
                Model.currentDay = Model.showtimesDays[ 0 ];
                Model.movieShowtimesByTheaters = out;
            } );
        }


    };

} );