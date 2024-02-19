
// contact us page - Google Maps Function
function initMap() {
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        center: { lat: -33.915, lng: 151.200 },
        zoom: 3
    });
    /*
    // Create a marker and set its position
    var marker = new google.maps.Marker({
        position: { lat: -33.915, lng: 151.200 },
        map: map,
        title: 'Agni Samooh Office' // You can set a custom title
    });*/

    // Optionally, you can add an info window to the marker
    var infowindow = new google.maps.InfoWindow({
        content: 'Agni Samooh Office.'
    });

    // Add a click event to open the info window when the marker is clicked
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

// Checkbox for showing user typed password for login and registration page
function showPassword() {
    var x = document.getElementById("user-login-password");
    var y = document.getElementById("confirm-user-login-password");
    var z = document.getElementById("register-user-login-password");

    if (x.type === "password" || y.type === "password" || z.type === "password") {
        x.type = "text";
        y.type = "text";
        z.type = "text";
    } else {
        x.type = "password";
        y.type = "password";
        z.type = "password";
    }
}

function submitForm() {

    var form = document.getElementById("contactus");
    var submissionConfirmation = document.getElementById("submissionConfirmation");

    form.onsubmit = function(event) {
        event.preventDefault();
        form.style.display = "none";
        submissionConfirmation.style.display = "block";
    };

    FormData.submit();
}