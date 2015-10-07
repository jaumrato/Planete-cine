app.filter( "formatDay", function() {
    return function( input ) {
        return moment( input, "YYYY-MM-DD" ).format( "ddd DD MMM" )
    }
} ).filter( "formatRuntime", function() {
    return function( input ) {
        if ( !input ) return "Durée inconnue";
        var hours = Math.floor( input / 3600 ),
            minutes = Math.floor( ( input - 3600 * hours ) / 60 );
        return 10 > hours && ( hours = "0" + hours ), 10 > minutes && ( minutes = "0" + minutes ), hours + "h" + minutes
    }
} ).filter( "formatRelease", function() {
    return function( input ) {
        return "Sortie en salle " + moment( input, "YYYY-MM-DD" ).fromNow()
    }
} ).filter( "formatRating", function() {
    return function( input ) {
        return input > 4.5 ? "★★★★★" : input > 3.5 ? "★★★★☆" : input > 2.5 ? "★★★☆☆" : input > 1.5 ? "★★☆☆☆" : input > .5 ? "★☆☆☆☆" : "☆☆☆☆☆"
    }
} ).filter( "formatGenres", function() {
    return function( input ) {
        return input.map( function( genre ) {
            return genre.$
        } ).join( ", " )
    }
} ).filter( "formatDistance", function() {
    return function( input ) {
        if ( !input ) return "Distance inconnue"
        return 1 > input ? 1e3 * input + " m" : input.toFixed( 2 ) + " km"
    }
} );