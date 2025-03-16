document.addEventListener('DOMContentLoaded', function() {
    // Pobieranie referencji do elementów DOM
    const saveBtn = document.getElementById('saveBtn');
    const showBtn = document.getElementById('showBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const cartContent = document.getElementById('cartContent');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
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
    
    // Funkcja do usuwania pojedynczego produktu z koszyka
    function removeItem(index) {
        const savedCart = localStorage.getItem(CART_KEY);
        if (savedCart) {
            let cart = JSON.parse(savedCart);
            cart.splice(index, 1);
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
            displayCart();
        }
    }
    
    // Funkcja do aktualizacji ilości produktu
    function updateQuantity(index, newQuantity) {
        const savedCart = localStorage.getItem(CART_KEY);
        if (savedCart) {
            let cart = JSON.parse(savedCart);
            if (newQuantity > 0) {
                cart[index].liczba = newQuantity;
                localStorage.setItem(CART_KEY, JSON.stringify(cart));
            } else {
                removeItem(index);
            }
            displayCart();
        }
    }
    
    // Funkcja wyszukiwania produktów
    function searchProducts() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        displayCart(searchTerm);
    }
    
    // Dodanie obsługi wyszukiwania
    if (searchBtn) {
        searchBtn.addEventListener('click', searchProducts);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                searchProducts();
            }
        });
    }
    
    function displayCart(searchTerm = '') {
        const savedCart = localStorage.getItem(CART_KEY);
        
        if (savedCart && JSON.parse(savedCart).length > 0) {
            let cart = JSON.parse(savedCart);
            
            // Filtrowanie produktów, jeśli podano wyszukiwaną frazę
            if (searchTerm) {
                const regex = new RegExp(searchTerm, 'i');
                cart = cart.filter(item => regex.test(item.nazwa));
            }
            
            if (cart.length === 0) {
                cartContent.innerHTML = '<p class="empty-cart">Nie znaleziono produktów pasujących do wyszukiwania</p>';
                return;
            }
            
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
                            <th>Akcje</th>
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
                        <td>
                            <input type="number" min="1" value="${item.liczba}" 
                                   class="quantity-input" data-index="${index}">
                        </td>
                        <td>${itemValue.toFixed(2)} zł</td>
                        <td>
                            <button class="remove-btn" data-index="${index}">Usuń</button>
                        </td>
                    </tr>
                `;
            });
            
            tableHTML += `
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="5">Suma:</td>
                            <td>${totalValue.toFixed(2)} zł</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            `;
            
            cartContent.innerHTML = tableHTML;
            
            // Dodanie obsługi przycisków usuwania
            document.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    removeItem(index);
                });
            });
            
            // Dodanie obsługi pól ilości
            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    const newQuantity = parseInt(this.value);
                    updateQuantity(index, newQuantity);
                });
            });
        } else {
            cartContent.innerHTML = '<p class="empty-cart">Koszyk jest pusty</p>';
        }
    }
    
    displayCart();
});
