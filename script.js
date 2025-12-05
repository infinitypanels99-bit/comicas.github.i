// =====================
// Retro Heroes Script
// =====================

window.addEventListener('load', () => {
    const heroes = [
        document.getElementById('hero1'),
        document.getElementById('hero2'),
        document.getElementById('hero3'),
        document.getElementById('hero4')
    ];

    // Αρχική θέση: 2 από τη μια, 2 από την άλλη
    heroes[0].style.left = '100px';
    heroes[0].style.top = '300px';

    heroes[1].style.left = '200px';
    heroes[1].style.top = '300px';

    heroes[2].style.left = `${window.innerWidth - 200}px`;
    heroes[2].style.top = '300px';

    heroes[3].style.left = `${window.innerWidth - 100}px`;
    heroes[3].style.top = '300px';

    // Προαιρετικά μικρές κινήσεις για πιο “ζωντανό” αποτέλεσμα
    setInterval(() => {
        heroes.forEach(hero => {
            const offsetX = Math.random() * 20 - 10;
            const offsetY = Math.random() * 20 - 10;
            hero.style.left = `${parseInt(hero.style.left) + offsetX}px`;
            hero.style.top = `${parseInt(hero.style.top) + offsetY}px`;
        });
    }, 1000);
});
