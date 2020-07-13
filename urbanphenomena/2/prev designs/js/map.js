var map, marker;

//create the map and set its style
function initMap() {
    //contact map
    var mapEl = document.getElementById("map");
    var latitude = 21.56911, longitude = 39.163324;
    var url = "https://goo.gl/maps/TkvvpYgWqtt";
    createMap(mapEl, latitude, longitude, url);

    //project map with default values
    var projectMap = document.getElementById("project-map");
    createMap(projectMap, latitude, longitude, url);

}

function createMap(mapEl, latitude, longitude, url) {
    //setting latitude and longitude
    var latLng = new google.maps.LatLng(latitude, longitude);
    //setting map properties/options
    var mapOptions = setMapOPtions(latLng);

    //creating the maps
    map = new google.maps.Map(mapEl, mapOptions);

    //creating and setting map marker
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
        url: url,
        title: "View this location on Google Maps",
    });

    //create event listener for marker
    google.maps.event.addListener(marker, 'click', function () {
        window.open(marker.url);
    });

}

function initProjectMap(projectLocation) {
    var mapEl = document.getElementById("project-map");
    createMap(mapEl, projectLocation.latitude, projectLocation.longitude, projectLocation.url);

}


function updateMap(location) {
    var latLng = new google.maps.LatLng(location.latitude, location.longitude);
    map.setCenter(latLng);
    marker.setOptions({
        position: latLng,
        url: location.url
    });
}

function setMapOPtions(latLng) {
    return {
        draggable: true,
        zoomControl: true,
        zoom: 13,
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        scrollwheel: false,
        styles: getMapStyles()
    };
}

function getMapStyles() {
    return [{
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
                    "saturation": 36
                        },
                {
                    "color": "#000000"
                        },
                {
                    "lightness": 40
                        }
                    ]
                },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
                    "visibility": "on"
                        },
                {
                    "color": "#000000"
                        },
                {
                    "lightness": 16
                        }
                    ]
                },
        {
            "featureType": "all",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
                    }]
                },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                    "color": "#000000"
                        },
                {
                    "lightness": 20
                        }
                    ]
                },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "color": "#000000"
                        },
                {
                    "lightness": 17
                        },
                {
                    "weight": 1.2
                        }
                    ]
                },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#000000"
                        },
                {
                    "lightness": 20
                        }
                    ]
                },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#000000"
                        },
                {
                    "lightness": 21
                        }
                    ]
                },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                    "color": "#000000"
                        },
                {
                    "lightness": 17
                        }
                    ]
                },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                    "color": "#000000"
                        },
                {
                    "lightness": 29
                        },
                {
                    "weight": 0.2
                        }
                    ]
                },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#000000"
                        },
                {
                    "lightness": 18
                        }
                    ]
                },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#000000"
                        },
                {
                    "lightness": 16
                        }
                    ]
                },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#000000"
                        },
                {
                    "lightness": 19
                        }
                    ]
                },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                    "color": "#000000"
                        },
                {
                    "lightness": 17
                        }
                    ]
                }
            ];
}
