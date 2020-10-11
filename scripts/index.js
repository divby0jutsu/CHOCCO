
//variables
const burger = document.querySelector('#hamburger');
const modalMenu = document.querySelector('.fullscreen-menu');
const closeIcon = document.querySelector('#close');
const menuNav = document.querySelector('#menu--vertical');


//functions
const remove = () => modalMenu.classList.remove("active");

burger.addEventListener('click', () => modalMenu.classList.add("active"));


//event listeners

closeIcon.addEventListener('click', remove);

menuNav.addEventListener('click', (e) => {
  if (e.currentTarget && e.currentTarget.id == 'menu--vertical') {
    e.stopPropagation()
  };
})

modalMenu.addEventListener('click', remove);