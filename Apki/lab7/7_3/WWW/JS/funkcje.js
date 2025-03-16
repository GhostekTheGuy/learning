function pokaz(id) {
    var tresc = "";
    switch (id) {
        case 2: tresc += pokazGalerie(); break;
        case 3: tresc += pokazPost(); break;
        case 4: tresc += pokazKontakt(); break;
        default: tresc += pokazO();
    }
    //pobierz element o wskazanym id i ustaw jego nową zawartość:
    document.getElementById('blok').innerHTML = tresc;
}

function pokazO() {
    var tresc = '<h2><br />Pierwsze kroki</h2> ';
    //operator += uzupełnia łańcuch kolejną porcją znaków:
    tresc += '<p> W aplikacjach typu SPA ......</p>' +
        '<p class="srodek"><img src="images/baner.jpg" alt="Zdjęcie" /></p>' +
        '<article><h2>Wady SPA</h2><p>' +
        ' Czas wytworzenia oraz nakład pracy ... </p></article>';
    //przekaż wynik – gotową zawartość – do miejsca wywołania funkcji:
    return tresc;
}

function pokazGalerie() {
    var tresc = '<h2><br />Moja galeria</h2>';
    tresc += ' <div class="galeria">';
    //wygeneruj kod HTML z obrazami za pomocą pętli for:
    for (i = 1; i <= 6; i++) {
        tresc += '<div class="slajd"><img src="public/obraz' + i + '.jpg" alt="Obraz ' + i + '" /></div>';
    }
    return tresc + '</div>';
}

function pokazKontakt() {
    var tresc = '<h2><br />Kontakt</h2>';
    tresc += '<article class="srodek">' +
        '<p>Skontaktuj się z nami:</p>' +
        '<p>Email: kontakt@example.com</p>' +
        '<p>Telefon: 123-456-789</p>' +
        '<p>Adres: ul. Warszawska 10, 00-000 Miasto</p>' +
        '</article>';
    return tresc;
}

function pokazPost() {
    tresc = '<h2><br />Dodaj post</h2>';
    tresc += '<article class="srodek" ><form action="mailto:b.panczyk@pollub.pl" ' +
        'method="post" onsubmit="return pokazDane();">' +
        'Twój email:<br /> <input type="email" name="email" id="email" required /><br />' +
        'Nazwisko i imię:<br /> <input type="text" name="nazwisko" id="nazwisko" required /><br />' +
        'Telefon:<br /> <input type="text" name="telefon" id="telefon" required /> <select name="kierunkowy"><option>+48</option></select><br />' +
        'Zainteresowania:<br />' +
        '<input type="checkbox" name="sport" id="sport" /> Sport ' +
        '<input type="checkbox" name="muzyka" id="muzyka" /> Muzyka ' +
        '<input type="checkbox" name="film" id="film" /> Film ' +
        '<input type="checkbox" name="inne" id="inne" /> Inne<br />' +
        'Wiek:<br />' +
        '<input type="radio" name="wiek" id="wiek1" value="<19" /> Mniej niż 19 ' +
        '<input type="radio" name="wiek" id="wiek2" value="19-30" /> 19-30 ' +
        '<input type="radio" name="wiek" id="wiek3" value="31-45" /> 31-45 ' +
        '<input type="radio" name="wiek" id="wiek4" value="46-60" /> 41-50 ' +
        '<input type="radio" name="wiek" id="wiek5" value=">60" /> Więcej niż 50<br />' +
        'Komentarz: <br /><textarea rows="3" cols="20" id="wiadomosc" name="wiadomosc" required></textarea>' +
        '<br /> <input type="submit" name="wyslij" value="Wyślij" />' +
        '</form></article>';
    return tresc;
}

function pokazDane() {
    var dane = "Następujące dane zostaną wysłane:\n";
    dane += "Email: " + document.getElementById('email').value + "\n";
    dane += "Nazwisko i imię: " + document.getElementById('nazwisko').value + "\n";
    dane += "Telefon: " + document.getElementById('telefon').value + "\n";
    dane += "Wiadomość: " + document.getElementById('wiadomosc').value + "\n";
    
    // Sprawdzanie zainteresowań
    dane += "Zainteresowania: ";
    var zainteresowania = [];
    if (document.getElementById('sport').checked) zainteresowania.push("Sport");
    if (document.getElementById('muzyka').checked) zainteresowania.push("Muzyka");
    if (document.getElementById('film').checked) zainteresowania.push("Film");
    if (document.getElementById('inne').checked) zainteresowania.push("Inne");
    dane += zainteresowania.join(", ") || "Brak wybranych" + "\n";
    
    // Sprawdzanie wieku
    dane += "Wiek: ";
    var wiekOptions = document.getElementsByName('wiek');
    var wybranyWiek = "";
    for (var i = 0; i < wiekOptions.length; i++) {
        if (wiekOptions[i].checked) {
            wybranyWiek = wiekOptions[i].value;
            break;
        }
    }
    dane += wybranyWiek || "Nie wybrano" + "\n";
    
    if (window.confirm(dane)) return true;
    else return false;
}