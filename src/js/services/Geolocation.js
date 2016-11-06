app.factory( 'Geolocation', function( Model, Notifier ) {

    return {

        getCurrentPosition: function( success ) {
            try {
                navigator.geolocation.getCurrentPosition(
                    this.onSuccess.bind( this, success ),
                    this.onError.bind( this, success ),
                    Model.geolocationParams
                );
            } catch ( err ) {
                this.onError( success );
            }
        },

        onSuccess: function( success, position ){
            success( position );
        },

        onError: function( success ) {
            Notifier.show( {
                title: 'Activation du GPS',
                message: "La recherche géolocalisée nécessite l'activation du GPS.",
                retry: this.getCurrentPosition( success )
            } );
        }

    };

} );
