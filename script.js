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
// --- GLOBAL CART HANDLING ---


// Load cart from localStorage or create empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Update cart icon counter
function updateCartCount() {
const cartCount = document.querySelector('.cart-count');
if (cartCount) {
cartCount.textContent = cart.length;
}
}


updateCartCount();


// Add an item to cart
function addToCart(product) {
cart.push(product);
localStorage.setItem("cart", JSON.stringify(cart));
updateCartCount();
alert("Added to cart!");
}


// Trigger from button
const addToCartBtn = document.querySelector("#addToCartBtn");
if (addToCartBtn) {
addToCartBtn.addEventListener("click", () => {
const productData = {
title: document.querySelector('.comic-title')?.textContent || "Comic",
price: document.querySelector('.comic-price')?.textContent || "0",
image: document.querySelector('.main-image')?.src || ""
};


addToCart(productData);
});
/* =====================
   Add to Cart System
===================== */

// Φόρτωση υπάρχοντος cart από localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Συνάρτηση: Προσθήκη στο καλάθι
function addToCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCartPopup(product.title);
}

// Popup ενημέρωσης
function showCartPopup(title) {
    const popup = document.createElement("div");
    popup.className = "cart-popup";
    popup.innerHTML = `
        <div class="cart-popup-box">
            <h3>✔ Το προσθέσατε στο καλάθι!</h3>
            <p><strong>${title}</strong></p>
            <div class="popup-buttons">
                <button id="continueBtn">Συνέχεια στο Shop</button>
                <button id="goToCartBtn">Μετάβαση στο Καλάθι</button>
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    document.getElementById("continueBtn").onclick = () => {
        popup.remove();
    };

    document.getElementById("goToCartBtn").onclick = () => {
        window.location.href = "cart.html";
    };
}

// Εύρεση όλων των κουμπιών "Add to Cart"
document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        const title = btn.dataset.title;
        const price = btn.dataset.price;
        const img = btn.dataset.img;

        addToCart({
            title: title,
            price: parseFloat(price),
            img: img
        });
    });
});
