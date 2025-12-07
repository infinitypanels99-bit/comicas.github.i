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
  const mainImg = document.getElementById("main-img");
  const comicTitle = document.getElementById("comic-title");
  const comicPrice = document.getElementById("comic-price");
  const comicDesc = document.getElementById("comic-desc");
  const thumbsContainer = document.querySelector(".comic-thumbs");

  comicTitle.textContent = comic.title;
  mainImg.src = comic.images[0];
  mainImg.alt = comic.title;
  comicPrice.textContent = "€" + comic.price;
  comicDesc.textContent = comic.desc;

  // Thumbnails: cover + άλλες 2 εικόνες
  thumbsContainer.innerHTML = ""; // Καθαρίζουμε παλιές

  const allThumbs = [comic.images[0], comic.images[1], comic.images[2]]; // πρώτη cover

  allThumbs.forEach((src, index) => {
    if (!src) return; // αν δεν υπάρχει εικόνα
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.alt = comic.title + " " + (index + 1);
    thumb.classList.add("thumb");
    thumbsContainer.appendChild(thumb);

    thumb.addEventListener("click", () => {
      mainImg.src = src;
    });
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
