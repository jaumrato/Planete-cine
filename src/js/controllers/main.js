app.controller( 'mainCtrl', function( $scope, Model ) {

    $scope.model = Model;

    $scope.$on( '$locationChangeStart', function( event, current, previous ) {
        Model.previousLocation = previous;
    } );

    $scope.notifier = {
        isVisible: false,

        reset: function() {
            this.isVisible = false;
            this.title = "";
            this.message = "";
        },

        show: function( o ) {
            this.title = o.title || "";
            this.message = o.message || "";

            this.onRetry = function() {
                this.reset();
                if ( typeof o.retry === "function" ) o.retry();
            };

            this.onClose = function() {
                this.reset();
                if ( typeof o.close === "function" ) o.close();
            };

            this.isVisible = true;
        }
    };

    $scope.loader = {
        isVisible: false,

        show: function( message ) {
            this.message = message;
            this.isVisible = true;
        },

        hide: function() {
            this.message = '';
            this.isVisible = false;
        }
    };

} );