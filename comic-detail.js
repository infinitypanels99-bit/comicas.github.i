// ----------------------
// COMICS DATA
// ----------------------
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

// ----------------------
// LOAD COMIC
// ----------------------
const params = new URLSearchParams(window.location.search);
const comicId = params.get('id');

if (comics[comicId]) {
    const comic = comics[comicId];

    const mainImg = document.getElementById("main-img");
    const titleElem = document.getElementById("comic-title");
    const priceElem = document.getElementById("comic-price");
    const descElem = document.getElementById("comic-desc");

    // Main image = cover
    mainImg.src = comic.images[0];
    mainImg.alt = comic.title;

    // Fill title, price, description
    titleElem.textContent = comic.title;
    priceElem.textContent = comic.price;
    descElem.textContent = comic.desc;

    // ----------------------
    // THUMBNAILS
    // ----------------------
    const thumbsContainer = document.querySelector(".comic-thumbs");
    thumbsContainer.innerHTML = ""; // καθαρίζουμε

    comic.images.forEach((imgSrc, index) => {
        if (!imgSrc) return;
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

function updateCartCount() {
    const cartCountElems = document.querySelectorAll('.cart-count');
    cartCountElems.forEach(span => span.textContent = cart.length);
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

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
// ADD TO CART BUTTON
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();

    // Αν υπάρχει κουμπί στο comic-detail
    const addBtn = document.querySelector(".add-to-cart-btn");
    if (addBtn && comics[comicId]) {
        const mainImg = document.getElementById("main-img");
        const titleElem = document.getElementById("comic-title");
        const priceElem = document.getElementById("comic-price");

        addBtn.addEventListener("click", () => {
            const title = titleElem ? titleElem.textContent : "Comic";
            const price = priceElem ? parseFloat(priceElem.textContent.replace("€","")) : 0;
            const img = mainImg ? mainImg.src : "";
            addToCart(title, price, img);
        });
    }

    // Επιπλέον: ενημέρωση όλων των κουμπιών .add-to-cart (π.χ. comics.html)
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", () => {
            const title = btn.dataset.title;
            const price = parseFloat(btn.dataset.price);
            const img = btn.dataset.img;
            addToCart(title, price, img);
        });
    });
});
