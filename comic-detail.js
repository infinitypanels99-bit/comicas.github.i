// Object με όλα τα comics
const comics = {
  tasm800: {
    title: "The Amazing Spider-Man #800 Variant Edition",
    images: [
      "images/comics/TASM issue 800 variant edition 1.jpg",
      "images/comics/TASM issue 800 variant edition 2.jpg",
      "images/comics/TASM issue 800 variant edition 3.jpg"
    ],
    price: "€12.99",
    desc: "Special variant edition of Spider-Man #800 with exclusive cover art."
  },
  batman500: {
    title: "Batman #500",
    images: [
      "images/comics/Batman issue 500 1.jpg",
      "images/comics/Batman issue 500 2.jpg",
      "images/comics/Batman issue 500 3.jpg"
    ],
    price: "€15.50",
    desc: "Classic Batman issue #500 featuring key storyline."
  },
  moonknight20: {
    title: "Moonknight #20",
    images: [
      "images/comics/Moonknight issue 20 1.jpg",
      "images/comics/Moonknight issue 20 2.jpg",
      "images/comics/Moonknight issue 20 3.jpg"
    ],
    price: "€10.00",
    desc: "Moonknight issue #20 with a thrilling plot twist."
  }
};

// Παίρνουμε το id από το URL
const params = new URLSearchParams(window.location.search);
const comicId = params.get('id');

if (comics[comicId]) {
  const comic = comics[comicId];

  // Κύρια εικόνα: cover
  const mainImg = document.getElementById("main-img");
  mainImg.src = comic.images[0]; // cover
  mainImg.alt = comic.title;

  document.getElementById("comic-title").textContent = comic.title;
  document.getElementById("comic-price").textContent = comic.price;
  document.getElementById("comic-desc").textContent = comic.desc;

  // Thumbnails: cover + 2 επόμενες εικόνες
  const thumbsContainer = document.querySelector(".comic-thumbs");
  thumbsContainer.innerHTML = ""; // καθαρίζουμε τυχόν προηγούμενα

  const thumbsImages = [comic.images[0], comic.images[1], comic.images[2]];

  thumbsImages.forEach((imgSrc, index) => {
    if (!imgSrc) return; // αν δεν υπάρχει εικόνα

    const thumb = document.createElement("img");
    thumb.className = "thumb";
    thumb.src = imgSrc;
    thumb.alt = comic.title + " " + (index + 1);

    thumb.addEventListener("click", () => {
      mainImg.src = imgSrc;
    });

    thumbsContainer.appendChild(thumb);
  });
} else {
  document.querySelector(".comic-detail").innerHTML = "<p>Comic not found.</p>";
}

// ----------------------
// CART SYSTEM
// ----------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(title, price, img) {
  cart.push({ title, price, img });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showCartPopup(title);
}

function updateCartCount() {
  const cartCountElems = document.querySelectorAll('.cart-count');
  cartCountElems.forEach(span => span.textContent = cart.length);
}
updateCartCount();

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

// Add to Cart button
const addBtn = document.querySelector(".add-to-cart-btn");
if (addBtn && comics[comicId]) {
  addBtn.addEventListener("click", () => {
    addToCart(comic.title, parseFloat(comic.price.replace("€", "")), comic.images[0]);
  });
}
