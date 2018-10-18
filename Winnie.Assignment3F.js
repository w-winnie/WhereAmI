//function to load the map initially at default location    
function loadMap()
{
    var myLatLong = {lat: 43.725761, lng: -79.800110};
    //customizations for the map
    var myOptions =
            {
                zoom: 13,
                navigationControl: true,
                scaleControl: true,
                panControl: true,
                center: myLatLong,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

    //creating the map block
    var map = new google.maps.Map(document.getElementById('myMap'), myOptions);

    //autocomplete search
    var autocomplete = new google.maps.places.Autocomplete(mySearch);

    //adding marker to the location
    var marker = new google.maps.Marker({position: myLatLong, map: map});

    //geocoder helps getting the latitude and longitude of the location
    var userLatLong = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function () {
        createMap(userLatLong, map);
    });

}// function loadmap() ends


//function to create map based on the search
function createMap(userLatLong, userMap) {
    //get the location input by the user
    var myLocation = document.getElementById('mySearch').value;
    userLatLong.geocode({'address': myLocation}, function (results) {
        
        userMap.setCenter(results[0].geometry.location);
        
        var marker = new google.maps.Marker({
            map: userMap,
            position: results[0].geometry.location
        });
        //creating pop up content, address of the place
        var markerPopup = new google.maps.InfoWindow({
            content: results[0].formatted_address
        });
        //attaching the pop up to the marker, on the action of mouseover
        marker.addListener('mouseover', function () {
            markerPopup.open(userMap, marker);
        });
    });
}//function createmap() ends
