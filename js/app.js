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
    } ).otherwise( {
        redirectTo: '/'
    } );

    // $locationProvider.html5Mode( {
    //     enabled: true,
    //     requireBase: false
    // } );
    // $locationProvider.hashPrefix( '!' );

} );

document.addEventListener( 'deviceready', function() {
    console.log( 'deviceready' );
    angular.bootstrap( document.body, [ 'Application' ] );
}, false );

document.addEventListener( "DOMContentLoaded", function( event ) {
    angular.bootstrap( document.body, [ 'Application' ] );
}, false );