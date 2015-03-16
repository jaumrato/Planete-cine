app.controller( 'movieDetailsCtrl', function( $scope, $routeParams, $sce, Service ) {

    $scope.model = Service.model;

    $scope.iframeURL = $sce.trustAsResourceUrl( 'http://www.allocine.fr/_video/iblogvision.aspx?cmedia=' + $scope.model.movieDetails.trailer.code );

} );