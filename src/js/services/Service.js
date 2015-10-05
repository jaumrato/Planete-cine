app.service( 'Service', function( $http ) {

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

    this.getMovieDetails = function( code ) {
        this.showLoader( 'Chargement des informations' );
        return $http.get( this.baseURL + '/movie', {
            params: {
                partner: 'YW5kcm9pZC12M3M',
                format: 'json',
                mediafmt: 'mp4-lc',
                profile: 'medium',
                code: code,
                striptags: 'synopsis,synopsisshort'
            }
        } ).then(
            function( resp ) {
                resp.data.movie.helpfulPositiveReview = resp.data.movie.helpfulPositiveReview || [];
                resp.data.movie.helpfulNegativeReview = resp.data.movie.helpfulNegativeReview || [];
                this.model.movieDetails.synopsis = resp.data.movie.synopsis;
                this.model.movieDetails.castMember = resp.data.movie.castMember;
                this.model.movieDetails.positiveReview = resp.data.movie.helpfulPositiveReview[ 0 ];
                this.model.movieDetails.negativeReview = resp.data.movie.helpfulNegativeReview[ 0 ];
                this.model.movieDetails.title = resp.data.movie.title;
                this.model.movieDetails.trailer = resp.data.movie.trailer;
                this.hideLoader();
            }.bind( this ),
            function() {
                this.hideLoader();
            }.bind( this )
        );
    };

    this.getTrailer = function() {
        return $http.get( this.baseURL + '/media', {
            params: {
                partner: 'YW5kcm9pZC12M3M',
                format: 'json',
                mediafmt: 'mp4-lc',
                profile: 'medium',
                code: this.model.movieDetails.trailer.code
            }
        } ).then( function( resp ) {
            if ( resp.data.media ) {
                this.model.movieDetails.trailer.url = resp.data.media.rendition[ 0 ].href;
            }
        }.bind( this ), function() {} );
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
            }.bind( this ),
            function() {
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
            }.bind( this ),
            function() {
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
            }.bind( this ),
            function() {
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
                this.model.lastAction = Date.now();
                this.model.nowShowingMovies = resp.data.feed.movie.map( function( movie ) {
                    if ( movie.poster && movie.poster.href )
                        movie.poster.href = movie.poster.href.replace( '/pictures', '/r_60_x/pictures' );
                    return movie;
                } );
                this.hideLoader();
            }.bind( this ),
            function() {
                this.hideLoader();
            }.bind( this )
        );

    };

    this.getShowtimeList = function( code ) {
        this.showLoader( 'Chargement des séances' );
        $http.get( this.baseURL + '/showtimelist', {
            params: {
                partner: 'YW5kcm9pZC12M3M',
                profile: 'medium',
                format: 'json',
                theaters: code
            }
        } ).then(
            function( resp ) {
                this.model.currentTheater = resp.data.feed.theaterShowtimes[ 0 ].place.theater;
                this.handleShowtimesList( resp.data.feed.theaterShowtimes[ 0 ].movieShowtimes );
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

    this.handleShowtimesList = function( movies ) {
        var out = {};
        this.model.currentDay = 0;
        this.model.showtimesDays = [];
        movies.forEach( function( movie ) {
            movie.scr.forEach( function( day ) {
                if ( this.model.showtimesDays.indexOf( day.d ) === -1 ) this.model.showtimesDays.push( day.d );
                out[ day.d ] = out[ day.d ] || {};
                if ( out[ day.d ][ movie.onShow.movie.title ] === undefined ) {
                    movie.onShow.movie.poster = movie.onShow.movie.poster || {};
                    out[ day.d ][ movie.onShow.movie.title ] = {
                        showtimes: {},
                        title: movie.onShow.movie.title,
                        code: movie.onShow.movie.code,
                        thumbnail: movie.onShow.movie.poster.href.replace( '/pictures', '/r_60_x/pictures' ),
                        runtime: movie.onShow.movie.runtime
                    };
                }
                var version = this.getShowtimeVersion( movie );
                out[ day.d ][ movie.onShow.movie.title ].showtimes[ version ] = day.t;
            }, this );
        }, this );
        this.model.showtimesDays.sort();
        this.model.moviesShowtimesForATheater = out;
    };

    localStorage.userSettings = localStorage.userSettings || JSON.stringify( {
        favoriteTheaters: []
    } )

    this.model = {
        moviesShowtimesForATheater: null,
        movieDetails: {},
        movieShowtimesByTheaters: {},
        nowShowingMovies: null,
        lastAction: Date.now(),
        previousLocation: '/#/',
        loader: {
            status: false,
            messsage: ''
        },
        userSettings: JSON.parse( localStorage.userSettings )
    };

} );