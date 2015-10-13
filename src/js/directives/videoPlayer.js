app.directive( 'videoPlayer', function( Model ) {
    return {
        restrict: 'E',
        replace: true,
        template: '<video controls="controls"></video>',
        link: function( $scope, $elements, $controller, $attr ) {
            var video = $elements[ 0 ],
                source = document.createElement( 'source' );
            source.src = Model.movieDetails.trailer.url;
            source.type = 'video/mp4';
            video.appendChild( source );
            if ( Model.movieDetails.trailer.thumbnail ) {
                video.poster = Model.movieDetails.trailer.thumbnail.replace( '/videothumbnails', '/r_720_x/videothumbnails' );
            }
            video.style.display = 'inline';
        }
    };
} );