var gulp = require( 'gulp' ),
    less = require( 'gulp-less' ),
    minifyCss = require( 'gulp-minify-css' ),
    uglify = require( 'gulp-uglify' ),
    gulp_concat = require( 'gulp-concat' );

/* * * CSS TASKS * * */

gulp.task( 'less', function() {
    return gulp.src( './src/style/main.less' ).pipe( less() ).pipe( minifyCss( {
        "advanced": true,
        "aggressiveMerging": true,
        "compatibility": "*",
        "keepBreaks": false,
        "mediaMerging": true
    } ) ).pipe( gulp.dest( './output' ) );
} );


/* * * JS TASKS * * */

gulp.task( 'js', function() {
    return gulp.src( [
        './src/js/app.js',
        './src/js/controllers/*.js',
        './src/js/services/*.js',
        './src/js/directives/*.js',
        './src/js/filters.js'
    ] ).pipe( uglify( {
        "mangle": false,
        "compress": {
            "sequences": true,
            "properties": true,
            "dead_code": true,
            "drop_debugger": true,
            "unsafe": false,
            "conditionals": true,
            "comparisons": true,
            "evaluate": true,
            "booleans": true,
            "loops": true,
            "unused": true,
            "hoist_funs": true,
            "hoist_vars": false,
            "if_return": true,
            "join_vars": true,
            "cascade": true,
            "side_effects": true,
            "warnings": true
        },
        "output": {
            "indent_start": 0,
            "indent_level": 4,
            "quote_keys": false,
            "space_colon": true,
            "ascii_only": false,
            "inline_script": false,
            "width": 80,
            "max_line_len": 32000,
            "beautify": false,
            "source_map": null,
            "bracketize": false,
            "comments": false,
            "semicolons": true
        }
    } ) ).pipe( gulp_concat( 'main.js' ) ).pipe( gulp.dest( './output' ) );
} );


/* * * PUBLIC TASKS * * */

gulp.task( 'build', [
    'less',
    'js',
] ).task( 'default', function() {
    gulp.watch( [ './src/style/*.less' ], [ 'less' ] );
    gulp.watch( [ './src/js/**/*.js' ], [ 'js' ] );
} );