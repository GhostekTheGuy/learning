function sprawdzPole(pole_id, obiektRegex) {
    // Funkcja sprawdza czy wartość wprowadzona do pola tekstowego
    // pasuje do wzorca zdefiniowanego za pomocą wyrażenia regularnego
    // Parametry funkcji:
    // pole_id - id sprawdzanego pola tekstowego
    // obiektRegex - wyrażenie regularne
    var obiektPole = document.getElementById(pole_id);
    if(!obiektRegex.test(obiektPole.value)) return (false);
    else return (true);
}

function sprawdz_radio(nazwa_radio) {
    // Funkcja sprawdza czy wybrano przycisk radio
    // z grupy przycisków o nazwie nazwa_radio
    var obiekt = document.getElementsByName(nazwa_radio);
    for (i = 0; i < obiekt.length; i++) { 
        wybrany = obiekt[i].checked;
        if (wybrany) return true; 
    }
    return false;
}

function sprawdz_box(box_id) {
    // Funkcja sprawdza czy przycisk typu checkbox
    // o identyfikatorze box_id jest zaznaczony
    var obiekt = document.getElementById(box_id);
    if (obiekt.checked) return true;
    else return false;
}

function sprawdz() {
    // Funkcja realizująca sprawdzanie całego formularza
    // wykorzystując funkcje pomocnicze
    var ok = true; // zmienna informująca o poprawnym wypełnieniu formularza
    
    // Definicje odpowiednich wyrażeń regularnych dla sprawdzenia
    // poprawności danych wprowadzonych do pól tekstowych
    obiektNazw = /^[a-zA-Z]{2,20}$/; // wyrażenie regularne dla nazwiska
    obiektemail = /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/;
    obiektWiek = /^[1-9][0-9]{1,2}$/;
    
    // Sprawdzanie kolejnych pól formularza.
    // w przypadku błędu - pojawia się odpowiedni komunikat
    if (!sprawdzPole("nazw", obiektNazw)) {
        ok = false;
        document.getElementById("nazw_error").innerHTML = "Wpisz poprawnie nazwisko!";
    } else document.getElementById("nazw_error").innerHTML = "";
    
    // Sprawdzenie wieku
    if (!sprawdzPole("wiek", obiektWiek)) {
        ok = false;
        document.getElementById("wiek_error").innerHTML = "Wpisz poprawnie wiek (liczba od 10 do 999)!";
    } else document.getElementById("wiek_error").innerHTML = "";
    
    // Sprawdzenie adresu email
    if (!sprawdzPole("email", obiektemail)) {
        ok = false;
        document.getElementById("email_error").innerHTML = "Wpisz poprawny adres e-mail!";
    } else document.getElementById("email_error").innerHTML = "";
    
    // Sprawdzenie czy wybrano przynajmniej jeden język
    if (!sprawdz_box("php") && !sprawdz_box("c") && !sprawdz_box("java")) {
        ok = false;
        document.getElementById("produkt_error").innerHTML = "Musisz wybrać przynajmniej jeden język!";
    } else document.getElementById("produkt_error").innerHTML = "";
    
    // Sprawdzenie czy wybrano sposób zapłaty
    if (!sprawdz_radio("zaplata")) {
        ok = false;
        document.getElementById("zaplata_error").innerHTML = "Musisz wybrać sposób zapłaty!";
    } else document.getElementById("zaplata_error").innerHTML = "";
    
    return ok;
}