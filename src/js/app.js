var app = angular.module( 'Application', [ 'ngRoute' ] );

app.config( function( $routeProvider ) {

    $routeProvider.when( '/', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
    } ).when( '/theaters', {
        templateUrl: 'templates/theaters.html',
        controller: 'theatersCtrl'
    } ).when( '/movies', {
        templateUrl: 'templates/movies.html',
        controller: 'moviesCtrl',
        resolve: {
            haveToRefresh: function( Model ) {
                // Refresh movies list if the previous state isn't the movie details page
                return Model.previousLocation.indexOf( '/movieDetails/' ) === -1;
            }
        }
    } ).when( '/showtimes/:theaterCode', {
        templateUrl: 'templates/showtimes.html',
        controller: 'showtimesCtrl',
        resolve: {
            haveToRefresh: function( Model ) {
                // Refresh showtimes list if the previous state isn't the movie details page
                return Model.previousLocation.indexOf( '/movieDetails/' ) === -1;
            },
            back: function( Model ) {
                if ( Model.previousLocation.indexOf( '/movieDetails/' ) > -1 ) {
                    // If user come from a movie details go back to the home
                    return '#/';
                } else {
                    // Else come back to the previous state
                    return Model.previousLocation;
                }
            }
        }
    } ).when( '/showtimesByTheater/:searchMode/:movieCode', {
        templateUrl: 'templates/showtimesByTheater.html',
        controller: 'showtimesByTheaterCtrl'
    } ).when( '/movieDetails/:movieCode', {
        templateUrl: 'templates/movieDetails.html',
        controller: 'movieDetailsCtrl',
        resolve: {
            displayShowtimesButtons: function( Model ) {
                // Display showtimes buttons if the previous state isn't a theaters showtimes page
                return Model.previousLocation.indexOf( '/showtimes/' ) === -1;
            },
            back: function( Model ) {
                if ( Model.previousLocation.indexOf( '/showtimesByTheater/' ) > -1 ) {
                    // If user come from a showtimes by theaters
                    return '#/movies';
                } else {
                    // Else come back to the previous state
                    return Model.previousLocation;
                }
            }
        }
    } ).otherwise( {
        redirectTo: '/'
    } );

} );