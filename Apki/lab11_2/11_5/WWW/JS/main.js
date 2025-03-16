function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var output = document.getElementById("geo");
    output.innerHTML = "<p>Szerokość geograficzna: " + latitude + "</p>" +
                       "<p>Długość geograficzna: " + longitude + "</p>";
}

function errorHandler(error) {
    var output = document.getElementById("geo");
    switch (error.code) {
        case error.PERMISSION_DENIED:
            output.innerHTML = "Użytkownik nie udostępnił danych.";
            break;
        case error.POSITION_UNAVAILABLE:
            output.innerHTML = "Dane lokalizacyjne niedostępne.";
            break;
        case error.TIMEOUT:
            output.innerHTML = "Przekroczono czas żądania.";
            break;
        case error.UNKNOWN_ERROR:
            output.innerHTML = "Wystąpił nieznany błąd.";
            break;
    }
}

function getLocation() {
    if (navigator.geolocation) {
        var options = {timeout: 60000};
        navigator.geolocation.getCurrentPosition(
            showLocation,
            errorHandler,
            options);
    } else {
        alert("Twoja przeglądarka nie wspiera geolokalizacji!");
    }
}
