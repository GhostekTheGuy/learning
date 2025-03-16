function obliczRate() {
    // Pobieramy wartości z formularza
    const kwota = parseFloat(document.getElementById("kwota").value);
    const oprocentowanieRoczne = parseFloat(document.getElementById("oprocentowanie").value);
    const liczbaRat = parseInt(document.getElementById("liczbaRat").value);
    
    // Czyścimy poprzedni komunikat błędu
    document.getElementById("komunikat").innerHTML = "";
    
    // Sprawdzamy, czy dane wejściowe są poprawne
    if (isNaN(kwota) || kwota <= 0) {
        document.getElementById("komunikat").innerHTML = "Błąd: Kwota pożyczki musi być liczbą dodatnią!";
        document.getElementById("wynikRata").value = "";
        return;
    }
    
    if (isNaN(oprocentowanieRoczne) || oprocentowanieRoczne < 0) {
        document.getElementById("komunikat").innerHTML = "Błąd: Oprocentowanie musi być liczbą nieujemną!";
        document.getElementById("wynikRata").value = "";
        return;
    }
    
    if (isNaN(liczbaRat) || liczbaRat <= 0 || !Number.isInteger(liczbaRat)) {
        document.getElementById("komunikat").innerHTML = "Błąd: Liczba rat musi być dodatnią liczbą całkowitą!";
        document.getElementById("wynikRata").value = "";
        return;
    }
    
    // Obliczamy oprocentowanie miesięczne
    const oprocentowanieMiesieczne = oprocentowanieRoczne / 100 / 12;
    
    // Obliczamy ratę według wzoru
    let rata;
    
    if (oprocentowanieMiesieczne === 0) {
        // Jeśli oprocentowanie jest 0%, to rata jest równa kwocie podzielonej przez liczbę rat
        rata = kwota / liczbaRat;
    } else {
        // Standardowy wzór na ratę
        rata = (kwota * oprocentowanieMiesieczne * Math.pow(1 + oprocentowanieMiesieczne, liczbaRat)) / 
               (Math.pow(1 + oprocentowanieMiesieczne, liczbaRat) - 1);
    }
    
    // Sprawdzamy, czy wynik jest skończony i nie jest NaN
    if (!isFinite(rata) || isNaN(rata)) {
        document.getElementById("komunikat").innerHTML = "Błąd: Nie można obliczyć raty dla podanych danych!";
        document.getElementById("wynikRata").value = "";
        return;
    }
    
    // Wyświetlamy wynik zaokrąglony do 2 miejsc po przecinku
    document.getElementById("wynikRata").value = rata.toFixed(2);
}
