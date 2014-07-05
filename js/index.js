var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener( 'deviceready', this.onDeviceReady, false );
    },

    onDeviceReady: function() {
        navigator.notification.vibrate( 300 );
        app.checkConnection();
    }

    checkConnection: function(){

        var networkState = navigator.connection.type,
            states = {};

        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        document.getElementById('main').innerHTML = 'Connection type: ' + states[networkState];
    }

};