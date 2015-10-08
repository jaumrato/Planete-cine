app.service( 'Service', function( $http, Model ) {

    this.baseURL = 'http://api.allocine.fr/rest/v3';

    this.saveUserSettings = function() {
        localStorage.userSettings = angular.toJson( this.model.userSettings );
    };

    this.showLoader = function( message ) {
        this.model.loader.message = message;
        this.model.loader.status = true;
    };

    this.hideLoader = function() {
        this.model.loader.message = '';
        this.model.loader.status = false;
    };

    this.getParams = function( o ) {
        return {
            params: angular.extend( {
                partner: 'YW5kcm9pZC12M3M',
                format: 'json'
            }, o )
        }
    };

    this.getShowtimeVersion = function( movie ) {
        var version = movie.version.$ === 'Français' ? 'VF' : 'VOSTFR';
        if ( movie.screenFormat && movie.screenFormat.$ === '3D' ) version += ' 3D';
        return version;
    };

    this.model = Model;

} );