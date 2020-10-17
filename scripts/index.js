// $(document).ready(function(){
//   $('.slider__list').bxSlider({
//     mode: 'fade',
//     captions: true,
//     slideWidth: 940
//   });
// });
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
let ndx = 0;


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
  sliderCount[c].style.opacity = 0;
  sliderCount[ndx].style.opacity = 0;
  sliderList.style.left= -100*c +"%";
  sliderCount[c].style.opacity = 1;
};

arrowLeft.addEventListener('click', e => {ndx = c; c--; moveSlider(e)});
arrowRight.addEventListener('click', e => {ndx = c; c++; moveSlider(e)});

const teamMember = $(".team-member");
const teamName = $(".team-member__name");
const teamInfo = $(".team-member__info");
const teamPhoto = $(".team-member__photo");

const clear = () => {
  teamInfo.height(0);
  teamName.removeClass("team-member__name--active");
  if(teamMember.css('flex-direction') == 'column') {
    teamPhoto.height(0);} else {teamPhoto.height('auto')};
}

$(window).on('resize', ()=> { clear(); console.log($(this).width())});


teamName.on('click', function() {
  let el = $(this).parents(".team-member").find(".team-member__info");
  let photo = $(this).parents(".team-member").find(".team-member__photo");
  let ht = 0;


  clear();

  if(teamMember.css('flex-direction') == 'column') {
  photo.height() == 0? photo.height(290):photo.height(0);
  } 

  el.children().each(function(){
    ht = ht + $(this).outerHeight();
  });

  if (el.height() == 0) {
    el.height(ht);
    $(this).toggleClass("team-member__name--active");
  } else {
    el.height(0);
  }
  
});

///

const review = $(".review");
const reviewAvatar = $(".reviews__switch-item");

review.eq(0).addClass("review__item--active");
reviewAvatar.eq(0).addClass("interactive-avatar--active");

reviewAvatar.on("click", function(e) {
  const link = $(this);
  const ndx = link.index();
  e.preventDefault();
  review.removeClass("review__item--active");
  reviewAvatar.removeClass("interactive-avatar--active");
  link.addClass("interactive-avatar--active");
  review.eq(ndx).addClass("review__item--active");
});


