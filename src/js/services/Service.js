app.service( 'Service', function( $http, Model, $timeout ) {

    this.saveUserSettings = function() {
        localStorage.userSettings = angular.toJson( Model.userSettings );
    };

    this.getParams = function( o ) {
        return {
            params: angular.extend( {
                partner: Model.API_KEY,
                format: 'json'
            }, o )
        }
    };

    this.getApiKey = function() {
        $http.get( 'https://dl.dropboxusercontent.com/u/54254237/key.json' ).then(
            function( resp ) {
                Model.API_KEY = resp.data.key;
            },
            function( err ) {
                $timeout( this.getApiKey.bind( this ), 400 );
            }.bind( this )
        );
    };

    this.getShowtimeVersion = function( movie ) {
        var version = movie.version.$ === 'Français' ? 'VF' : 'VOSTFR';
        if ( movie.screenFormat && movie.screenFormat.$ === '3D' ) version += ' 3D';
        return version;
    };

} );