function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var output = document.getElementById("geo");
    output.innerHTML = "<p>Szerokość geograficzna: " + latitude + "</p>" +
                       "<p>Długość geograficzna: " + longitude + "</p>";
    
    // Inicjalizacja mapy po uzyskaniu lokalizacji
    initializeMap(latitude, longitude);
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

// Nowa funkcja do inicjalizacji mapy
function initializeMap(lat, lng) {
    var wspolrzedne = new google.maps.LatLng(lat, lng);
    var opcjeMapy = {
        zoom: 10,
        center: wspolrzedne,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var mapa = new google.maps.Map(document.getElementById("mapka"), opcjeMapy);
    
    // Dodanie markera na mapie w miejscu lokalizacji użytkownika
    var marker = new google.maps.Marker({
        position: wspolrzedne,
        map: mapa,
        title: "Twoja lokalizacja"
    });
}
