app.service( 'Service', function( $http ) {

    this.baseURL = 'http://api.allocine.fr/rest/v3';

    this.saveUserSettings = function() {
        localStorage.userSettings = angular.toJson( this.model.userSettings );
    };

    this.showLoader = function( message ) {
        this.model.loader.message = 'Chargement des séances ...';
        this.model.loader.status = true;
    };

    this.hideLoader = function() {
        this.model.loader.message = '';
        this.model.loader.status = false;
    };

    this.getTheatersByGeolocation = function() {
        this.showLoader( 'Chargement des cinémas' );
        $http.get( this.baseURL + '/theaterlist', {
            params: {
                partner: 'YW5kcm9pZC12M3M',
                format: 'json',
                radius: 30,
                lat: this.model.position.latitude,
                long: this.model.position.longitude,
                count: 30
            }
        } ).then(
            function( resp ) {
                this.model.theaters = resp.data.feed.theater;
                this.hideLoader();
            }.bind( this )
        );
    };

    this.getTheaters = function() {
        this.showLoader( 'Chargement des cinémas' );
        $http.get( this.baseURL + '/theaterlist', {
            params: {
                partner: 'YW5kcm9pZC12M3M',
                format: 'json',
                count: 30,
                location: this.model.searchTheaterText
            }
        } ).then(
            function( resp ) {
                this.model.theaters = resp.data.feed.theater;
                this.hideLoader();
            }.bind( this )
        );
    };

    this.getShowtimesListForAMovie = function( code ) {
        this.showLoader( 'Chargement des séances' );
        $http.get( this.baseURL + '/showtimelist', {
            params: {
                partner: 'YW5kcm9pZC12M3M',
                format: 'json',
                radius: 30,
                count: 30,
                lat: this.model.position.latitude,
                long: this.model.position.longitude,
                movie: code
            }
        } ).then(
            function( resp ) {
                this.handleMovieShowtimesListByTheaters( resp.data.feed.theaterShowtimes );
                this.hideLoader();
            }.bind( this )
        );
    };

    this.getNowShowingMovies = function() {
        this.showLoader( 'Chargement des films' );
        $http.get( this.baseURL + '/movielist', {
            params: {
                partner: 'YW5kcm9pZC12M3M',
                format: 'json',
                count: 50,
                filter: 'nowshowing',
                order: 'toprank'
            }
        } ).then(
            function( resp ) {
                this.model.nowShowingMovies = resp.data.feed.movie;
                this.hideLoader();
            }.bind( this )
        );

    };

    this.getShowtimeList = function( code ) {
        this.showLoader( 'Chargement des séances' );
        $http.get( this.baseURL + '/showtimelist', {
            params: {
                partner: 'YW5kcm9pZC12M3M',
                format: 'json',
                theaters: code
            }
        } ).then(
            function( resp ) {
                this.model.currentTheater = resp.data.feed.theaterShowtimes[ 0 ].place.theater;
                this.handleShowtimesList( resp.data.feed.theaterShowtimes[ 0 ].movieShowtimes );
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
                }.bind( this ) );
            }.bind( this ) );
            this.model.movieShowtimesByTheaters = out;
        }.bind( this ) );
    };

    this.handleShowtimesList = function( movies ) {
        var out = {};
        this.model.currentDay = 0;
        this.model.showtimesDays = [];
        movies.forEach( function( movie ) {
            movie.scr.forEach( function( day ) {
                if ( this.model.showtimesDays.indexOf( day.d ) === -1 ) this.model.showtimesDays.push( day.d );
                out[ day.d ] = out[ day.d ] || {};
                if ( out[ day.d ][ movie.onShow.movie.title ] === undefined ) {
                    out[ day.d ][ movie.onShow.movie.title ] = {
                        showtimes: {},
                        title: movie.onShow.movie.title,
                        casting: movie.onShow.movie.castingShort,
                        genres: movie.onShow.movie.genre,
                        thumbnail: movie.onShow.movie.poster.href,
                        runtime: movie.onShow.movie.runtime,
                        release: movie.onShow.movie.release.releaseDate,
                        ratings: movie.onShow.movie.statistics,
                        trailer: movie.onShow.movie.trailer
                    };
                }
                var version = this.getShowtimeVersion( movie );
                out[ day.d ][ movie.onShow.movie.title ].showtimes[ version ] = day.t;
            }.bind( this ) );
        }.bind( this ) );
        this.model.showtimesDays.sort();
        this.model.moviesShowtimesForATheater = out;
    };

    localStorage.userSettings = localStorage.userSettings || JSON.stringify( {
        favoriteTheaters: []
    } )

    this.model = {
        moviesShowtimesForATheater: null,
        loader: {
            status: false,
            messsage: ''
        },
        userSettings: JSON.parse( localStorage.userSettings )
    };

    console.log( this.model );

} );