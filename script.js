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
/* ============================
   COMICS IMAGE CAROUSEL
============================ */
document.querySelectorAll('.comic-card').forEach(card => {
    const slider = card.querySelector('.comic-slider');
    const images = slider.querySelectorAll('img');
    const next = card.querySelector('.next');
    const prev = card.querySelector('.prev');

    let index = 0;

    function updateSlide() {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    next.addEventListener('click', () => {
        index = (index + 1) % images.length;
        updateSlide();
    });

    prev.addEventListener('click', () => {
        index = (index - 1 + images.length) % images.length;
        updateSlide();
    });
});
