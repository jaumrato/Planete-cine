var app = {

    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener( 'deviceready', this.onDeviceReady, false );
        document.getElementById('button').addEventListener( 'click', this.onButtonClick, false );
    },

    onDeviceReady: function() {
        navigator.notification.vibrate( 300 );
    },

    onButtonClick: function(){
        app.getWeather();
    },

    getWeather: function() {

        var req = new XMLHttpRequest();
        req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139', false); 
        req.send(null);
        if(req.status == 200){
            document.getElementById('main').innerHTML = req.responseText;
        }
        
    }

};