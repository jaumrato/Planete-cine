app.controller( 'homeCtrl', [
    '$scope',
    'Service',
    function( $scope, Service ) {

        $scope.model = Service.model;

        $scope.model.previousView = 'home';

        $scope.setCurrentTheater = function( theater ) {
            Service.setCurrentTheater( theater );
        };

    }
] )