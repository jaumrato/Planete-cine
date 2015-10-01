app.controller( 'homeCtrl', function( $scope, Service ) {

        $scope.model = Service.model;

        $scope.state = 'home';

        $scope.model.previousView = 'home';

        $scope.setCurrentTheater = function( theater ) {
            Service.setCurrentTheater( theater );
        };

    }

);