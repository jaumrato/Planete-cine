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
            haveToRefresh: function( Service ) {
                // Refresh movies list if the previous state isn't the movie details page
                return Service.model.previousLocation.indexOf( '/movieDetails/' ) === -1;
            }
        }
    } ).when( '/showtimes/:theaterCode', {
        templateUrl: 'templates/showtimes.html',
        controller: 'showtimesCtrl',
        resolve: {
            haveToRefresh: function( Service ) {
                // Refresh showtimes list if the previous state isn't the movie details page
                return Service.model.previousLocation.indexOf( '/movieDetails/' ) === -1;
            },
            back: function( Service ) {
                if ( Service.model.previousLocation.indexOf( '/movieDetails/' ) > -1 ) {
                    // If user come from a movie details go back to the home
                    return '#/';
                } else {
                    // Else come back to the previous state
                    return Service.model.previousLocation;
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
            displayShowtimesButtons: function( Service ) {
                // Display showtimes buttons if the previous state isn't a theaters showtimes page
                return Service.model.previousLocation.indexOf( '/showtimes/' ) === -1;
            },
            back: function( Service ) {
                if ( Service.model.previousLocation.indexOf( '/showtimesByTheater/' ) > -1 ) {
                    // If user come from a showtimes by theaters
                    return '#/movies';
                } else {
                    // Else come back to the previous state
                    return Service.model.previousLocation;
                }
            }
        }
    } ).otherwise( {
        redirectTo: '/'
    } );

} );

getConnection = function() {
    var connection;
    if ( navigator.connection.type == 0 || navigator.connection.type == 'none' ) connection = false;
    else connection = true;
    return connection;
};

// document.addEventListener( 'deviceready', function() {
//     var checkConnection = function() {
//         var connection = getConnection();
//         if ( connection ) {
//             angular.bootstrap( document.body, [ 'Application' ] );
//         } else {
//             var message = "Une connexion à internet est nécessaire pour utiliser cette application.",
//                 title = "Connexion internet",
//                 buttonLabels = [ "Réessayer", "Annuler" ];
//             navigator.notification.confirm( message, function( index ) {
//                 checkConnection();
//             }, title, buttonLabels );
//         }
//     };
//     checkConnection();
// }, false );

window.addEventListener( "load", function() {
    angular.bootstrap( document.body, [ "Application" ] )
}, false );