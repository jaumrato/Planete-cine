app.service( 'Service', function( $http, Model ) {

    this.baseURL = 'http://api.allocine.fr/rest/v3';

    this.saveUserSettings = function() {
        localStorage.userSettings = angular.toJson( this.model.userSettings );
    };

    this.showLoader = function( message ) {
        this.model.loader.message = message;
        this.model.loader.status = true;
    };

    this.hideLoader = function() {
        this.model.loader.message = '';
        this.model.loader.status = false;
    };

    this.getParams = function( o ) {
        return {
            params: angular.extend( {
                partner: 'YW5kcm9pZC12M3M',
                format: 'json'
            }, o )
        }
    };

    this.getShowtimesListForAMovie = function( movieCode, mode ) {
        this.showLoader( 'Chargement des séances' );

        var params = {
            partner: 'YW5kcm9pZC12M3M',
            format: 'json',
            count: 30,
            movie: movieCode
        };

        if ( mode === "gps" ) {
            params.radius = 30;
            params.lat = this.model.position.latitude;
            params.long = this.model.position.longitude;
        } else if ( mode === "favorites" ) {
            params.theaters = this.model.userSettings.favoriteTheaters.map( function( theater ) {
                return theater.code;
            } ).join( ',' );
        }

        $http.get( this.baseURL + '/showtimelist', {
            params: params
        } ).then(
            function( resp ) {
                this.handleMovieShowtimesListByTheaters( resp.data.feed.theaterShowtimes );
                this.hideLoader();
            }.bind( this ),
            function() {
                this.hideLoader();
            }.bind( this )
        );
    };

    this.getShowtimeVersion = function( movie ) {
        var version = movie.version.$ === 'Français' ? 'VF' : 'VOSTFR';
        if ( movie.screenFormat && movie.screenFormat.$ === '3D' ) version += ' 3D';
        return version;
    };

    this.handleMovieShowtimesListByTheaters = function( theaters ) {
        var out = {};
        this.model.currentDay = 0;
        this.model.showtimesDays = [];
        theaters.forEach( function( item ) {
            item.movieShowtimes.forEach( function( movie ) {
                movie.scr.forEach( function( day ) {
                    if ( this.model.showtimesDays.indexOf( day.d ) === -1 ) this.model.showtimesDays.push( day.d );
                    out[ day.d ] = out[ day.d ] || {};
                    if ( out[ day.d ][ item.place.theater.code ] === undefined ) {
                        out[ day.d ][ item.place.theater.code ] = item.place.theater;
                        out[ day.d ][ item.place.theater.code ].showtimes = {};
                    }
                    out[ day.d ][ item.place.theater.code ].showtimes[ this.getShowtimeVersion( movie ) ] = day.t;
                }, this );
            }, this );
            for ( var day in out ) {
                var theatersList = [];
                for ( var code in out[ day ] ) {
                    theatersList.push( out[ day ][ code ] )
                }
                out[ day ] = theatersList;
            }
            this.model.movieShowtimesByTheaters = out;
        }, this );
    };

    localStorage.userSettings = localStorage.userSettings || JSON.stringify( {
        favoriteTheaters: []
    } )

    this.model = Model;

} );