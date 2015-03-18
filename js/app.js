var app = angular.module( 'Application', [ 'ngRoute' ] );

app.config( function( $routeProvider, $locationProvider ) {

    $routeProvider.when( '/', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
    } ).when( '/theaters', {
        templateUrl: 'templates/theaters.html',
        controller: 'theatersCtrl'
    } ).when( '/movies', {
        templateUrl: 'templates/movies.html',
        controller: 'moviesCtrl'
    } ).when( '/showtimes/:theaterCode', {
        templateUrl: 'templates/showtimes.html',
        controller: 'showtimesCtrl'
    } ).when( '/showtimesByTheater/:movieCode', {
        templateUrl: 'templates/showtimesByTheater.html',
        controller: 'showtimesByTheaterCtrl'
    } ).when( '/movieDetails', {
        templateUrl: 'templates/movieDetails.html',
        controller: 'movieDetailsCtrl'
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

document.addEventListener( 'deviceready', function() {

    var checkConnection = function() {
        var connection = getConnection();
        if ( connection ) {
            angular.bootstrap( document.body, [ 'Application' ] );
        } else {
            var message = "Une connexion à internet est nécessaire pour utiliser cette application.",
                title = "Connexion internet",
                buttonLabels = [ "Réessayer", "Annuler" ];
            navigator.notification.confirm( message, function( index ) {
                checkConnection();
            }, title, buttonLabels );
        }
    };

    checkConnection();
}, false );