var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener( 'deviceready', this.onDeviceReady, false );
    },

    onDeviceReady: function() {
        navigator.notification.vibrate( 300 );
        document.getElementById('main').innerHTML = "Test de remplacement";        
        app.checkConnection();
    },

    checkConnection: function() {
        var networkState = navigator.network.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Connexion inconnue';
        states[Connection.ETHERNET] = 'Connexion Ethernet';
        states[Connection.WIFI]     = 'Connexion WiFi';
        states[Connection.CELL_2G]  = 'Connexion cellulaire 2G';
        states[Connection.CELL_3G]  = 'Connexion cellulaire 3G';
        states[Connection.CELL_4G]  = 'Connexion cellulaire 4G';
        states[Connection.NONE]     = 'Pas de connexion réseau';

        alert('Type de connexion : ' + states[networkState]);
    }

};