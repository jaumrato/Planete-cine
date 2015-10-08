app.factory( 'Theaters', function( $http, Model, Service ) {

    return {

        search: function( mode, search ) {
            Service.showLoader( 'Chargement des cinémas' );

            var params = {
                text: {
                    location: search
                },
                gps: {
                    radius: 30,
                    lat: search.latitude,
                    lon: search.longitude
                }
            };

            $http.get(
                Model.baseURL + '/theaterlist',
                Service.getParams( params[ mode ] )
            ).then(
                function( resp ) {
                    Model.theaters = resp.data.feed.theater;
                    Service.hideLoader();
                },
                function() {
                    Service.hideLoader();
                }
            );
        }

    };

} );