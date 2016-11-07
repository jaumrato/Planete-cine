app.factory( 'Geolocation', function( Model, $rootScope ) {

    return {

        watcher: null,

        startWatchPosition: function() {
            try {
                this.watcher = navigator.geolocation.watchPosition(
                    this.onSuccess.bind( this ),
                    this.onError.bind( this ),
                    Model.geolocationParams
                );
            } catch ( err ) {
                this.onError( success );
            }
        },

        stopWatchPosition: function() {
            if ( this.watcher ) navigator.geolocation.clearWatch( this.watcher );
        },

        onSuccess: function( position ) {
            $rootScope.$apply( function() {
                Model.position = position.coords;
            } );
        },

        onError: function() {
            // Nothing to do
        }

    };

} );
