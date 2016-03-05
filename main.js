    var codeArray = [13, 14, 15, 16, 41, 42, 43, 46];

    $(document).ready(function () {
        console.log('hello');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log('hello2');
                isItSnowing(position.coords.latitude + ',' + position.coords.longitude);
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

    function isItSnowing(location, woeid) {
        $.simpleWeather({
            location: location,
            woeid: woeid,
            unit: 'f',
            success: function (weather) {
                console.log("hello3");
                if ($.inArray(weather.code, codeArray)) {
                    $('#inner h1').text("IT'S FUCKING SNOWING.");
                    $('#inner:after').css("content", "url(imgs/snow.png)");
                }
            },
            error: function (error) {
                console.log(error);
                showMyError(error);
            }
        })
    }