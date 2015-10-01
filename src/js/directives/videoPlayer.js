app.directive( 'videoPlayer', function( Service ) {
    return {
        restrict: 'E',
        replace: true,
        template: '<video controls="controls"></video>',
        link: function( $scope, $elements, $controller, $attr ) {
            Service.getTrailer().then( function() {
                var video = $elements[ 0 ];
                var source = document.createElement( 'source' );
                source.src = $scope.model.movieDetails.trailer.url;
                source.type = 'video/mp4';
                video.appendChild( source );
                video.addEventListener( "canplay", function() {
                    video.style.display = 'inline';
                } );
            } );
        }
    };
} );