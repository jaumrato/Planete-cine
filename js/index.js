var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener( 'deviceready', this.onDeviceReady, false );
    },

    onDeviceReady: function() {
        navigator.notification.vibrate( 300 );
    }

};