
//variables
const burger = document.querySelector('#hamburger');
const modalMenu = document.querySelector('.fullscreen-menu');
const closeIcon = document.querySelector('#close');
const menuLinks = document.querySelectorAll(".menu__link");
const body = document.querySelector("body");
///
const arrowLeft = document.getElementById("sliderArrowLeft");
const arrowRight = document.getElementById("sliderArrowRight");
const sliderList = document.getElementById("sliderRoot");
const sliderCount = document.querySelectorAll(".slider__item");
let c = 0;


const toggleMenu = () => {
  modalMenu.classList.toggle("fullscreen-menu--active");
  body.classList.toggle("body--active");
}

burger.addEventListener('click', toggleMenu);
closeIcon.addEventListener('click', toggleMenu);
menuLinks.forEach(el => {
  el.addEventListener('click', toggleMenu);
});

///

const moveSlider = (e) => {
  e.preventDefault();
  c < 0 ? c = sliderCount.length - 1: c = c%sliderCount.length;
  sliderList.style.left= -100*c +"%";
};

arrowLeft.addEventListener('click', (e) => {c--; moveSlider(e)});
arrowRight.addEventListener('click', (e) => {c++; moveSlider(e)});

sliderList.addEventListener ('swipe-left', (e) => {c--; moveSlider(e)});
sliderList.addEventListener('swipe-right', (e) => {c++; moveSlider(e)});
