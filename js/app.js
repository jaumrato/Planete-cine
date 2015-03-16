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

document.addEventListener( 'deviceready', function() {
//window.addEventListener( 'load', function() {
    angular.bootstrap( document.body, [ 'Application' ] );
}, false );