
//variables
const burger = document.querySelector('#hamburger');
const modalMenu = document.querySelector('.fullscreen-menu');
const closeIcon = document.querySelector('#close');
const menuLinks = document.querySelectorAll(".menu__link");
const body = document.querySelector("body");


const toggleMenu = () => {
  modalMenu.classList.toggle("fullscreen-menu--active");
  body.classList.toggle("body--active");
}

burger.addEventListener('click', toggleMenu);
closeIcon.addEventListener('click', toggleMenu);
menuLinks.forEach(el => {
  el.addEventListener('click', toggleMenu);
});
