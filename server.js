var express = require( 'express' );
var app = express();

app.use( express.static( __dirname + '/www/' ) );

app.get( '/', function( req, res ) {
    res.sendFile( 'index.html' );
} );

app.listen( 8000 );
console.log( 'Express started on port 8000' );