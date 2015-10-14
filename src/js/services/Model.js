app.factory( 'Model', function() {

    return {

        BASE_URL: 'http://api.allocine.fr/rest/v3',

        API_KEY: null,

        moviesShowtimesForATheater: null,

        movieDetails: null,

        movieShowtimesByTheaters: {},

        nowShowingMovies: null,

        previousLocation: '/#/',

        online: true,

        loader: {
            isVisible: false,
            message: "Chargement ..."
        },

        currentTheater: null,

        notifier: {
            isVisible: false,
            title: "",
            message: "",
            onRetry: function() {},
            onClose: function() {}
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