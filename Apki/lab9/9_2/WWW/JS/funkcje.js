$(document).ready(function() {
    // a) ustal szary kolor tła dla elementu #tresc
    $('#tresc').css('background-color', 'gray');
    
    // b) dla wszystkich pól tekstowych ustaw pogrubienie czcionki
    $('input[type="text"]').css('font-weight', 'bold');
    
    // c) zmień kolor tła pól tekstowych z wynikami obliczeń na jasnozielony
    $('#rata, #suma').addClass('zielony');
    
    // d) obsługa akcji kliknięcia przycisku "Oblicz"
    $('#oblicz').click(function() {
        var kwota = parseFloat($('#kwota').val());
        var okres = parseFloat($('#okres').val());
        var procent = parseFloat($('#procent').val());
        
        if (!isNaN(kwota) && !isNaN(okres) && !isNaN(procent)) {
            var oprocentowanie = procent / 100;
            var rata = kwota * (oprocentowanie / 12) / (1 - Math.pow(1 + (oprocentowanie / 12), -okres));
            var suma = rata * okres;
            
            $('#rata').val(rata.toFixed(2));
            $('#suma').val(suma.toFixed(2));
        } else {
            alert('Wprowadź poprawne dane!');
        }
    });
});