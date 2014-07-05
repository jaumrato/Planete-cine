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

        navigator.geolocation.getCurrentPosition( function( position ){

            var lat = position.coords.latitude,
                lon = position.coords.longitude,
                url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric',
                req = new XMLHttpRequest();

            req.open('GET', url, false);

            req.send(null);

            if(req.status == 200){
                var obj = JSON.parse( req.responseText );
                document.getElementById('main').innerHTML = obj.main.temp + ' °C<br/>';
                document.getElementById('main').innerHTML += obj.weather.description + '<br/>';
                document.getElementById('main').innerHTML += obj.name + '<br/>';
                document.getElementById('main').innerHTML += obj.main.humidity + '% humidity';
            }

        }, function(){

            alert('error');

        });
        
    }

};