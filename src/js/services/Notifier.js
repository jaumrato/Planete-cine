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
                Model.notifier.reset();
                if ( typeof o.retry === "function" ) o.retry();
            };

            Model.notifier.onClose = function() {
                Model.notifier.reset();
                if ( typeof o.close === "function" ) o.close();
            };

            Model.notifier.isVisible = true;
        }

    };

} );