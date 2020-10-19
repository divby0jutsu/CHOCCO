
  const slider = $('.slider__list').bxSlider(
    {
      pager:false,
      controls: false
    }
  );

  $('#sliderArrowLeft').on('click', e => {
    e.preventDefault();
    slider.goToPrevSlide();
  });

  $('#sliderArrowRight').on('click',  e => {
    e.preventDefault();
    slider.goToNextSlide();
  });

setTimeout(slider.reloadSlider(), 1000);



// const arrowLeft = document.getElementById("sliderArrowLeft");
// const arrowRight = document.getElementById("sliderArrowRight");
// const sliderList = document.getElementById("sliderRoot");
// const sliderCount = document.querySelectorAll(".slider__item");
// let c = 0;
// let ndx = 0;


// const moveSlider = (e) => {
//   e.preventDefault();
//   c < 0 ? c = sliderCount.length - 1: c = c%sliderCount.length;
//   sliderCount[c].style.opacity = 0;
//   sliderCount[ndx].style.opacity = 0;
//   sliderList.style.left= -100*c +"%";
//   sliderCount[c].style.opacity = 1;
// };

// arrowLeft.addEventListener('click', e => {ndx = c; c--; moveSlider(e)});
// arrowRight.addEventListener('click', e => {ndx = c; c++; moveSlider(e)});



