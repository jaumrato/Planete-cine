app.factory( 'Theaters', function( $http, Model, Service ) {

    return {

        search: function( mode, search ) {
            var params = {
                text: {
                    location: search,
                    count: 50
                },
                gps: {
                    radius: 30,
                    count: 50,
                    lat: search.latitude,
                    lon: search.longitude
                }
            };

            return $http.get(
                Model.BASE_URL + '/theaterlist',
                Service.getParams( params[ mode ] )
            );
        },

        handleTheatersList: function( theaters ) {
            Model.theaters = theaters;
        }

    };

} );