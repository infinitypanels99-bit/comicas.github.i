const characters = [
  {name:'spiderman', file:'images/spiderman.gif'},
  {name:'wolverine', file:'images/wolverine.gif'},
  {name:'batman', file:'images/batman.gif'},
  {name:'venom', file:'images/venom.gif'}
];

const stage = document.getElementById('stage');

function spawnChar(char) {
  const el = document.createElement('img');
  el.src = char.file;
  el.className = 'sprite';
  const fromLeft = Math.random() > 0.5;
  el.style.top = (50 + Math.random() * 300) + 'px';
  el.style.width = 140 + Math.floor(Math.random()*60) + 'px';
  el.style.left = fromLeft ? '-220px' : stage.clientWidth + 'px';
  stage.appendChild(el);

  const targetX = fromLeft ? (50 + Math.random()* (stage.clientWidth - 200)) : (Math.random()*(stage.clientWidth-200));
  const duration = 3000 + Math.random()*3000;

  el.animate([
    { transform: `translateX(0px) rotate(0deg)` },
    { transform: `translateX(${fromLeft ? targetX + 250 : -targetX - 250}px) rotate(${fromLeft ? 10 : -10}deg)` }
  ], { duration: duration, easing: 'ease-in-out' });

  setTimeout(()=> {
    el.animate([{ opacity:1 }, { opacity:0 }], { duration:800 }).onfinish = () => el.remove();
  }, duration - 600);
}

function popRandom() {
  const c = characters[Math.floor(Math.random()*characters.length)];
  spawnChar(c);
  setTimeout(popRandom, 1500 + Math.random()*2500);
}

window.addEventListener('load', ()=> {
  setTimeout(()=> spawnChar(characters[0]), 500);
  setTimeout(()=> spawnChar(characters[1]), 1100);
  setTimeout(()=> spawnChar(characters[2]), 1800);
  setTimeout(()=> spawnChar(characters[3]), 2600);
  setTimeout(popRandom, 4000);
});
