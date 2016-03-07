    var codeArray = [13, 14, 15, 16, 41, 42, 43, 46];

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

    function isItSnowing(long, lat) {

    }