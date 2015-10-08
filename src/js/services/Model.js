app.factory( 'Model', function() {

    return {

        baseURL: 'http://api.allocine.fr/rest/v3',

        moviesShowtimesForATheater: null,

        movieDetails: {},

        movieShowtimesByTheaters: {},

        nowShowingMovies: null,

        previousLocation: '/#/',

        loader: {
            status: false,
            messsage: ''
        },

        userSettings: JSON.parse( localStorage.userSettings || JSON.stringify( {
            favoriteTheaters: []
        } ) ),

        geolocationParams: {
            maximumAge: 0,
            timeout: 1000,
            enableHighAccuracy: true
        }

    };

} );