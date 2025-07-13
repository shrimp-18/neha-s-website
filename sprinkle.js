const burger = document.querySelector('.burger img');
const sideMenu = document.getElementById('sideMenu');
const closeBtn = document.getElementById('closeBtn');

burger.addEventListener('click', () => {
  sideMenu.style.width = '250px';
});

closeBtn.addEventListener('click', () => {
  sideMenu.style.width = '0';
});
