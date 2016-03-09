    var codeArray = [13, 14, 15, 16, 41, 42, 43, 46];

    $(document).ready(function () {
        console.log('hello');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                (fetch('http://api.openweathermap.org/data/2.5/weather?lat=' + pos.lat + '&lon=' + pos.lng + '&appid=44db6a862fba0b067b1930da0d769e98')
                    .then(function (response) {
                        return response.text()
                    }).then(function (body) {
                        body = JSON.parse(body);
                        console.log(body);
                        if (body.weather[0].main == "Snow" || body.weather[0].main == "Heavy Snow" || body.weather[0].main == "Snow Flurries" || body.weather[0].main == "Blowing Snow") {
                            $('#inner').addClass('changed');
                            $('#inner h1').text("IT'S FUCKING SNOWING.");
                        }
                    }))
            })
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