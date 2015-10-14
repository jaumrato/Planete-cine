app.controller( 'mainCtrl', function( $scope, Model, Service, $window ) {

    $scope.model = Model;

    $scope.$on( '$locationChangeStart', function( event, current, previous ) {
        Model.previousLocation = previous;
    } );

    Service.getApiKey();

} );