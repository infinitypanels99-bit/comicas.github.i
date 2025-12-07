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
document.addEventListener("DOMContentLoaded", () => {

    // Φόρτωση υπάρχοντος cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Ενημέρωση του cart count σε όλα τα pages
    function updateCartCount() {
        const countElements = document.querySelectorAll('.cart-count');
        countElements.forEach(el => el.textContent = cart.length);
    }

    updateCartCount();

    // Αποθήκευση cart στο localStorage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    // Προσθήκη προϊόντος στο cart
    function addToCart(product) {
        cart.push(product);
        saveCart();
        showCartPopup(product.title);
    }

    // Popup ενημέρωσης
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

    // =====================
    // Συνδεση κουμπιών Add to Cart
    // =====================
    // 1. Κουμπιά στη σελίδα comics.html
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            const title = btn.dataset.title;
            const price = parseFloat(btn.dataset.price);
            const img = btn.dataset.img;
            addToCart({ title, price, img });
        });
    });

    // 2. Κουμπί στη σελίδα comic-detail.html
    const detailBtn = document.querySelector(".add-to-cart-btn");
    if (detailBtn && window.comicData) {
        detailBtn.addEventListener("click", () => {
            addToCart({
                title: comicData.title,
                price: parseFloat(comicData.price.replace('€', '')),
                img: comicData.images[0]
            });
        });
    }
});
