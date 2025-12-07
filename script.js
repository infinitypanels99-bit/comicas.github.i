window.addEventListener('load', () => {
    const stage = document.getElementById('stage');

    // Επιβεβαίωση ότι οι χαρακτήρες υπάρχουν
    const heroes = [
        document.getElementById('hero1'),
        document.getElementById('hero2'),
        document.getElementById('hero3'),
        document.getElementById('hero4')
    ];

    heroes.forEach(hero => {
        if (!hero) console.warn('Missing hero element in stage:', hero);
    });


});
// ----------------------
// CART SYSTEM
// ----------------------
function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = loadCart();
    const countElement = document.getElementById("cart-count");
    if (countElement) countElement.textContent = cart.length;
}

// Add item
function addToCart(title, price, image) {
    const cart = loadCart();

    cart.push({
        title: title,
        price: price,
        image: image
    });

    saveCart(cart);

    alert("Added to cart!");
}

// Render items in cart.html
function renderCart() {
    const container = document.getElementById("cart-items");
    if (!container) return;

    const cart = loadCart();
    let total = 0;

    container.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <img src="${item.image}">
            <div class="cart-details">
                <h3>${item.title}</h3>
                <p>€${item.price}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;

        container.appendChild(div);
    });

    document.getElementById("cart-total").textContent = total;
}

function removeFromCart(index) {
    const cart = loadCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

// Auto-run
updateCartCount();
renderCart();
