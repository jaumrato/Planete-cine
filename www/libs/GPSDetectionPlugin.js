cordova.define( 'cordova/plugin/GPSDetectionPlugin', function( require, exports, module ) {
    var exec = require( 'cordova/exec' );

    var gpsDetect = function() {};

    gpsDetect.prototype.checkGPS = function( successCallback, failureCallback ) {
        exec( successCallback, failureCallback, 'GPSDetectionPlugin', 'GPSDetection', [] );
    };

    var gpsDetect = new gpsDetect();
    module.exports = gpsDetect;
} );