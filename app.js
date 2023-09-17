/*---Map showing code---*/
let map;
let marker;

function initMap() {
    // Initialize the map
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 30.9022, lng: 75.8573 }, // Punjab, India coordinates
        zoom: 8,
    });

    // Request geolocation
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(success, error);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy; // Accuracy in meters

    // Update the map center and marker position
    const newPosition = new google.maps.LatLng(lat, lng);
    map.setCenter(newPosition);

    // Remove existing marker (if any)
    if (marker) {
        marker.setMap(null);
    }

    // Add a new marker
    marker = new google.maps.Marker({
        position: newPosition,
        map: map,
        title: "Your Location"
    });

    // Set zoom level based on accuracy
    map.fitBounds(new google.maps.Circle({
        center: newPosition,
        radius: accuracy
    }).getBounds());

    // Update the HTML elements with geolocation data
    document.getElementById('latitude').textContent = lat.toFixed(6);
    document.getElementById('longitude').textContent = lng.toFixed(6);
    document.getElementById('accuracy').textContent = Math.round(accuracy);
}

function error(err) {
    if (err.code === 1) {
        alert("Please allow geolocation access");
    } else {
        alert("Cannot get current location, please try again later.");
    }
}