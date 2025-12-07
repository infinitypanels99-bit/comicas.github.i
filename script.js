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
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Προσθήκη προϊόντος στο cart
function addToCart(item) {
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showCartPopup(item.title);
}

// Ενημέρωση cart count στο header
function updateCartCount() {
  const cartCountElems = document.querySelectorAll('.cart-count');
  cartCountElems.forEach(span => span.textContent = cart.length);
}
updateCartCount();

// Popup επιβεβαίωσης
function showCartPopup(title) {
  const popup = document.createElement("div");
  popup.className = "cart-popup";
  popup.innerHTML = `
    <div class="cart-popup-box">
      <h3>✔ Το προσθέσατε στο καλάθι!</h3>
      <p><strong>${title}</strong></p>
      <div class="popup-buttons">
        <button id="continueBtn">Continue Shopping</button>
        <button id="goToCartBtn">Go Τo Cart</button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);

  document.getElementById("continueBtn").onclick = () => popup.remove();
  document.getElementById("goToCartBtn").onclick = () => window.location.href = "cart.html";
}

// ----------------------
// COMICS.HTML: Add to Cart Buttons
// ----------------------
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const title = btn.dataset.title;
    const price = parseFloat(btn.dataset.price);
    const img = btn.dataset.img;

    addToCart({ title, price, img });
  });
});

// ----------------------
// CART.HTML: Display cart items
// ----------------------
function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  const cartTotalElem = document.getElementById("cart-total");

  if (!cartContainer || !cartTotalElem) return;

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}">
      <div class="cart-details">
        <h3>${item.title}</h3>
        <p>€${item.price.toFixed(2)}</p>
      </div>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartContainer.appendChild(div);
    total += parseFloat(item.price);
  });

  cartTotalElem.textContent = total.toFixed(2);

  // Remove buttons
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
      updateCartCount();
    });
  });
}

// Εμφάνιση cart στο load αν είμαστε στο cart.html
if (document.getElementById("cart-items")) {
  displayCart();
}
});
