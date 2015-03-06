app.controller( 'theatersCtrl', function( $scope, Service ) {

    $scope.model = Service.model;

    $scope.launchTheaterSearchByGeolocation = function() {

        this.showLoader( 'Chargement des cinémas' );

        navigator.geolocation.getCurrentPosition( function( position ) {
            $scope.model.position = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            Service.getTheatersByGeolocation();
        }, function( e ) {
            alert( e );
        }, {
            enableHighAccuracy: true
        } );

    };

    $scope.launchTheaterSearch = function() {
        Service.getTheaters();
    };

} );