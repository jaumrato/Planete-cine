app.filter( 'formatDay', function() {
    return function( input ) {
        return moment( input, 'YYYY-MM-DD' ).format( 'ddd DD MMM' );
    };
} ).filter( 'formatRuntime', function() {
    return function( input ) {
        var hours = Math.floor( input / 3600 );
        var minutes = Math.floor( ( input - ( hours * 3600 ) ) / 60 );
        if ( hours < 10 ) hours = "0" + hours;
        if ( minutes < 10 ) minutes = "0" + minutes;
        return hours + 'h' + minutes;
    };
} ).filter( 'formatRelease', function() {
    return function( input ) {
        return 'Sortie en salle ' + moment( input, 'YYYY-MM-DD' ).fromNow();
    };
} ).filter( 'formatRating', function() {
    return function( input ) {
        if ( input > 4.5 ) return '★★★★★';
        else if ( input > 3.5 ) return '★★★★☆';
        else if ( input > 2.5 ) return '★★★☆☆';
        else if ( input > 1.5 ) return '★★☆☆☆';
        else if ( input > 0.5 ) return '★☆☆☆☆';
        else return '☆☆☆☆☆';
    };
} ).filter( 'formatGenres', function() {
    return function( input ) {
        return input.map( function( genre ) {
            return genre.$
        } ).join( ', ' );
    };
} ).filter( 'formatDistance', function() {
    return function( input ) {
        if ( input < 1 ) return input * 1000 + ' m';
        else return input.toFixed( 2 ) + ' km';
    };
} );