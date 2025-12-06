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

  document.getElementById("comic-title").textContent = comic.title;
  document.getElementById("main-img").src = comic.images[0];
  document.getElementById("main-img").alt = comic.title;
  document.getElementById("comic-price").textContent = comic.price;
  document.getElementById("comic-desc").textContent = comic.desc;

  const thumbs = document.querySelectorAll(".comic-thumbs .thumb");
  thumbs.forEach((thumb, index) => {
    if(comic.images[index + 1]) { // οι υπόλοιπες εικόνες
      thumb.src = comic.images[index + 1];
      thumb.alt = comic.title + " " + (index + 2);
      thumb.addEventListener("click", () => {
        document.getElementById("main-img").src = comic.images[index + 1];
      });
    } else {
      thumb.style.display = "none";
    }
  });
} else {
  document.querySelector(".comic-detail").innerHTML = "<p>Comic not found.</p>";
}
