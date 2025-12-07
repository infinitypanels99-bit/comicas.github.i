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
document.addEventListener("DOMContentLoaded", () => {

// ----------------------
// CART SYSTEM
// ----------------------

// Φόρτωση cart από localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Συνάρτηση: Ενημέρωση cart count σε όλα τα pages
function updateCartCount() {
    const cartCountElems = document.querySelectorAll('.cart-count');
    cartCountElems.forEach(span => span.textContent = cart.length);
}

// Αποθήκευση cart στο localStorage και ενημέρωση count
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Προσθήκη στο cart
function addToCart(title, price, img) {
    cart.push({ title, price, img });
    saveCart();
    showCartPopup(title);
}

// ----------------------
// POPUP
// ----------------------
function showCartPopup(title) {
    const popup = document.createElement("div");
    popup.className = "cart-popup";
    popup.innerHTML = `
        <div class="cart-popup-box">
            <h3>✔ Added to Cart!</h3>
            <p><strong>${title}</strong></p>
            <div class="popup-buttons">
                <button id="continueBtn">Continue Shopping</button>
                <button id="goToCartBtn">Go to Cart</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);

    document.getElementById("continueBtn").onclick = () => popup.remove();
    document.getElementById("goToCartBtn").onclick = () => window.location.href = "cart.html";
}

// ----------------------
// EVENT LISTENERS
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
    // Ενημέρωση cart count κατά το φόρτωμα της σελίδας
    updateCartCount();

    // Εύρεση όλων των "Add to Cart" κουμπιών (π.χ. comics.html)
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            const title = btn.dataset.title;
            const price = parseFloat(btn.dataset.price);
            const img = btn.dataset.img;
            addToCart(title, price, img);
        });
    });

    // Αν υπάρχει το κουμπί στο comic-detail page
    const addBtn = document.querySelector(".add-to-cart-btn");
    if (addBtn) {
        const mainImg = document.getElementById("main-img");
        const titleElem = document.getElementById("comic-title");
        const priceElem = document.getElementById("comic-price");

        addBtn.addEventListener("click", () => {
            const title = titleElem ? titleElem.textContent : "Comic";
            const price = priceElem ? parseFloat(priceElem.textContent.replace("€", "")) : 0;
            const img = mainImg ? mainImg.src : "";
            addToCart(title, price, img);
        });
    }
});
