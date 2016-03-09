    var codeArray = [13, 14, 15, 16, 41, 42, 43, 46];
    var APPID = 'dj0yJmk9TjVLTXRsb0tpNTlLJmQ9WVdrOWEyUmhaWEJoTm5FbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1lOA--'; // Your Yahoo Application ID
    var DEG = 'c'; // c for celsius, f for fahrenheit

    $(document).ready(function () {
        console.log('hello');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log('hello2');
                isItSnowing(position.coords.latitude, position.coords.longitude);
            });
        } else {
            showMyError("Your browser doesn't support geolocation.");
        }
    });

    function showMyError(str) {
        $('#inner h1').hide();
        $('#inner:after').css({
            "content": str,
            "display": "inline"
        });
    }

    function isItSnowing(lon, lat) {

        // Yahoo's PlaceFinder API http://developer.yahoo.com/geo/placefinder/
        // We are passing the R gflag for reverse geocoding (coordinates to place name)
        var geoAPI = 'http://where.yahooapis.com/geocode?location=' + lat + ',' + lon + '&flags=J&gflags=R&appid=' + APPID;

        // Forming the query for Yahoo's weather forecasting API with YQL
        // http://developer.yahoo.com/weather/

        var wsql = 'select * from weather.forecast where woeid=WID and u="' + DEG + '"',
            weatherYQL = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(wsql) + '&format=json&callback=?',
            code, city, results, woeid;

        // Issue a cross-domain AJAX request (CORS) to the GEO service.
        // Not supported in Opera and IE.
        $.getJSON(geoAPI, function (r) {

            if (r.ResultSet.Found == 1) {

                results = r.ResultSet.Results;
                code = results[0].city;
                code = results[0].item.code;
                alert(code);

                //                // This is the city identifier for the weather API
                //                woeid = results[0].woeid;
                //
                //                // Make a weather API request (it is JSONP, so CORS is not an issue):
                //                $.getJSON(weatherYQL.replace('WID', woeid), function (r) {
                //
                //                    if (r.query.count == 1) {
                //
                //                    } else {
                //                        showMyError("Error retrieving weather data!");
                //                    }
                //                });

            }

        }).error(function () {
            showError("Your browser does not support CORS requests!");
        });

    }