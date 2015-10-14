app.controller( 'mainCtrl', function( $scope, Model, Service ) {

    $scope.model = Model;

    $scope.$on( '$locationChangeStart', function( event, current, previous ) {
        Model.previousLocation = previous;
    } );

    $scope.$watch( function() {
        return navigator.connection.type;
    }, function() {
        var networkState = navigator.connection.type;

        var states = {};
        states[ Connection.UNKNOWN ] = false;
        states[ Connection.ETHERNET ] = true;
        states[ Connection.WIFI ] = true;
        states[ Connection.CELL_2G ] = true;
        states[ Connection.CELL_3G ] = true;
        states[ Connection.CELL_4G ] = true;
        states[ Connection.CELL ] = true;
        states[ Connection.NONE ] = false;

        //Model.online = states[ networkState ];
        Model.online = networkState;
    } );

    Service.getApiKey();

} );