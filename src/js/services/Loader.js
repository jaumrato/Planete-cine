app.factory( 'Loader', function( Model ) {

    return {

        show: function( message ) {
            Model.loader.message = message;
            Model.loader.isVisible = true;
        },

        hide: function() {
            Model.loader.message = '';
            Model.loader.isVisible = false;
        }

    };

} );