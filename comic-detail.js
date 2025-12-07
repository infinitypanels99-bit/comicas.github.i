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
    price: "12.99",
    desc: "Special variant edition of Spider-Man #800 with exclusive cover art."
  },
  batman500: {
    title: "Batman #500",
    images: [
      "images/comics/Batman issue 500 1.jpg",
      "images/comics/Batman issue 500 2.jpg",
      "images/comics/Batman issue 500 3.jpg"
    ],
    price: "15.50",
    desc: "Classic Batman issue #500 featuring key storyline."
  },
  moonknight20: {
    title: "Moonknight #20",
    images: [
      "images/comics/Moonknight issue 20 1.jpg",
      "images/comics/Moonknight issue 20 2.jpg",
      "images/comics/Moonknight issue 20 3.jpg"
    ],
    price: "10.00",
    desc: "Moonknight issue #20 with a thrilling plot twist."
  }
};

// ----------------------
// GET COMIC ID FROM URL
// ----------------------
const params = new URLSearchParams(window.location.search);
const comicId = params.get('id');

if (!comics[comicId]) {
  document.querySelector(".comic-detail").innerHTML = "<p>Comic not found.</p>";
} else {
  const comic = comics[comicId];

  // Populate the page
  document.getElementById("comic-title").textContent = comic.title;
  document.getElementById("main-img").src = comic.images[0];
  document.getElementById("main-img").alt = comic.title;
  document.getElementById("comic-price").textContent = "€" + comic.price;
  document.getElementById("comic-desc").textContent = comic.desc;

  // Thumbnails
  const thumbs = document.querySelectorAll(".comic-thumbs .thumb");
  thumbs.forEach((thumb, index) => {
    if(comic.images[index + 1]) {
      thumb.src = comic.images[index + 1];
      thumb.alt = comic.title + " " + (index + 2);
      thumb.addEventListener("click", () => {
        document.getElementById("main-img").src = comic.images[index + 1];
      });
    } else {
      thumb.style.display = "none";
    }
  });

  // Add to Cart Button
  const addBtn = document.querySelector(".add-to-cart-btn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      addToCart({
        title: comic.title,
        price: parseFloat(comic.price),
        img: comic.images[0]
      });
    });
  }
}

// ----------------------
// CART SYSTEM (shared)
// ----------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(item) {
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showCartPopup(item.title);
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
      <h3>✔ Το προσθέσατε στο καλάθι!</h3>
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
