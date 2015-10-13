app.factory( 'Notifier', function( Model ) {

    return {

        reset: function() {
            Model.notifier.isVisible = false;
            Model.notifier.title = "";
            Model.notifier.message = "";
        },

        show: function( o ) {
            Model.notifier.title = o.title || "";
            Model.notifier.message = o.message || "";

            Model.notifier.onRetry = function() {
                this.reset();
                if ( typeof o.retry === "function" ) o.retry();
            }.bind( this );

            Model.notifier.onClose = function() {
                this.reset();
                if ( typeof o.close === "function" ) o.close();
            }.bind( this );

            Model.notifier.isVisible = true;
        }

    };

} );