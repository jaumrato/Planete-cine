app.controller( 'mainCtrl', function( $scope, Model ) {

    $scope.model = Model;

    $scope.$on( '$locationChangeStart', function( event, current, previous ) {
        Model.previousLocation = previous;
    } );

} );