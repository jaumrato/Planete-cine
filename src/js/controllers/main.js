app.controller( 'mainCtrl', function( $scope, Model, Service, $window ) {

    $scope.model = Model;

    $scope.$on( '$locationChangeStart', function( event, current, previous ) {
        Model.previousLocation = previous;
    } );

    // $scope.$watch( function() {
    //     return navigator.connection;
    // }, function( newVal, oldVal ) {
    //     var states = {};
    //     states[ Connection.UNKNOWN ] = false;
    //     states[ Connection.ETHERNET ] = true;
    //     states[ Connection.WIFI ] = true;
    //     states[ Connection.CELL_2G ] = true;
    //     states[ Connection.CELL_3G ] = true;
    //     states[ Connection.CELL_4G ] = true;
    //     states[ Connection.CELL ] = true;
    //     states[ Connection.NONE ] = false;
    //     Model.online = states[ navigator.connection.type ];
    // } );
    //

    $scope.online = navigator.onLine;

    $window.addEventListener( "offline", function() {
        $scope.$apply( function() {
            $scope.online = false;
        } );
    }, false );

    $window.addEventListener( "online", function() {
        $scope.$apply( function() {
            $scope.online = true;
        } );
    }, false );

    Service.getApiKey();

} );