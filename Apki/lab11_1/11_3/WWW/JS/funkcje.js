document.addEventListener('DOMContentLoaded', function() {
    // Pobieranie referencji do elementów DOM
    const saveBtn = document.getElementById('saveBtn');
    const showBtn = document.getElementById('showBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const cartContent = document.getElementById('cartContent');
    
    // Klucz do przechowywania koszyka w localStorage
    const CART_KEY = 'shopping_cart';
    
    // Obsługa przycisku "Zapisz produkt do koszyka"
    saveBtn.addEventListener('click', function() {
        // Pobieranie wartości z formularza
        const nazwa = document.getElementById('nazwa').value;
        const cena = parseFloat(document.getElementById('cena').value);
        const kolor = document.getElementById('kolor').value;
        const liczba = parseInt(document.getElementById('liczba').value);
        
        // Sprawdzenie czy wszystkie pola są wypełnione
        if (!nazwa || isNaN(cena) || !kolor || isNaN(liczba)) {
            alert('Wypełnij wszystkie pola formularza!');
            return;
        }
        
        // Tworzenie obiektu produktu
        const item = {
            nazwa: nazwa,
            cena: cena,
            kolor: kolor,
            liczba: liczba
        };
        
        // Pobieranie istniejącego koszyka lub tworzenie nowego
        let cart = [];
        const savedCart = localStorage.getItem(CART_KEY);
        
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
        
        // Dodawanie produktu do koszyka
        cart.push(item);
        
        // Zapisywanie koszyka do localStorage
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        
        // Wyświetlanie informacji o dodaniu produktu
        alert('Produkt został dodany do koszyka!');
        console.log(item); // Wyświetlenie właściwości obiektu w konsoli
        
        // Czyszczenie formularza
        document.getElementById('productForm').reset();
        
        // Odświeżenie widoku koszyka
        displayCart();
    });
    
    // Obsługa przycisku "Wyświetl koszyk"
    showBtn.addEventListener('click', function() {
        displayCart();
    });
    
    deleteBtn.addEventListener('click', function() {
        if (confirm('Czy na pewno chcesz usunąć wszystkie produkty z koszyka?')) {
            localStorage.removeItem(CART_KEY);
            displayCart();
            alert('Koszyk został wyczyszczony!');
        }
    });
    
    function displayCart() {
        const savedCart = localStorage.getItem(CART_KEY);
        
        if (savedCart && JSON.parse(savedCart).length > 0) {
            const cart = JSON.parse(savedCart);
            
            let tableHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Lp.</th>
                            <th>Nazwa produktu</th>
                            <th>Cena</th>
                            <th>Kolor</th>
                            <th>Liczba sztuk</th>
                            <th>Wartość</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            let totalValue = 0;
            
            cart.forEach((item, index) => {
                const itemValue = item.cena * item.liczba;
                totalValue += itemValue;
                
                tableHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${item.nazwa}</td>
                        <td>${item.cena.toFixed(2)} zł</td>
                        <td>${item.kolor}</td>
                        <td>${item.liczba}</td>
                        <td>${itemValue.toFixed(2)} zł</td>
                    </tr>
                `;
            });
            
            tableHTML += `
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="5">Suma:</td>
                            <td>${totalValue.toFixed(2)} zł</td>
                        </tr>
                    </tfoot>
                </table>
            `;
            
            cartContent.innerHTML = tableHTML;
        } else {
            cartContent.innerHTML = '<p class="empty-cart">Koszyk jest pusty</p>';
        }
    }
    
    displayCart();
});
