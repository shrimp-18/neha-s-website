const sprinkleContainer = document.getElementById('sprinkle-con');
const symbols = ['🌸', '🏵️', '🌟'];

function createSprinkle() {
  const sprinkle = document.createElement('div');
  sprinkle.className = 'sprinkle';
  sprinkle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
  sprinkle.style.left = Math.random() * 100 + 'vw';
  sprinkle.style.fontSize = (Math.random() * 15 + 20) + 'px';
  sprinkleContainer.appendChild(sprinkle);

  setTimeout(() => {
    sprinkle.remove();
  }, 40000);
}

setInterval(createSprinkle, 200);
