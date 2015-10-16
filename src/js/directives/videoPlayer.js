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

            // Stop video when app is in background
            document.addEventListener( 'pause', video.pause.bind( video ), false );
            window.addEventListener( 'blur', video.pause.bind( video ), false );

            // Stop video when user scroll and video isn't visible
            video.parentElement.addEventListener( 'scroll', function() {
                if ( this.scrollTop > video.offsetHeight ) video.pause();
            }, false );
        }
    };
} );