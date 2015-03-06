var app;

function onLoad() {
    document.addEventListener( "deviceready", onDeviceReady, false );
}

function onDeviceReady() {

    angular.bootstrap( document.body, [ 'Application' ] );

    app = angular.module( 'Application', [ 'ngRoute' ] );

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
    } );

}