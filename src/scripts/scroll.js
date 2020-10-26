(function() {
  const section = $('section');
const content = $('.maincontent');
const fixedMenu = $('.fixed-menu')
const fixedMenuItem = $('.fixed-menu__item');
const sectionActiveClass = 'section--active';
const fMIActiveClass = 'fixed-menu__item--active';
const darkThemeClass = 'fixed-menu--dark';

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

section.eq(0).addClass(sectionActiveClass);

const calcSectionPosition = (ndx) => {
  const position = ndx*-100;

  if(isNaN(position)) {
    console.log('передан неверное значение в calcSectionPosition');
    return 0;
  } else {
    return position;
  }
}

const changeSidemenuTheme = (ndx) => {
  section.eq(ndx).attr('data-sidemenu-theme') == 'dark' ? fixedMenu.addClass(darkThemeClass) : fixedMenu.removeClass(darkThemeClass);
}

const findNdxOfActiveEl = (item, activeClass) => {
  return item.filter(`.${activeClass}`).index();
}

const resetActiveClassForItem = (item, itemNdx, activeClass) => {
  item.removeClass(activeClass);
  item.eq(itemNdx).addClass(activeClass);
};

const changeActiveSection = (ndx) => {
  resetActiveClassForItem(section, ndx, sectionActiveClass);
  resetActiveClassForItem(fixedMenuItem, ndx, fMIActiveClass);
};


const moveToSection = ndx => {
  const position = calcSectionPosition(ndx);

  content.css({
    transform: `translateY(${position}%)`
  });

  changeSidemenuTheme(ndx);
};



const viewportScroller = () => {

  return {
    next() {
      let ndx = findNdxOfActiveEl(section, sectionActiveClass);
      if (ndx !== section.length-1) {
        ndx++;   
        inScroll = true; 
        changeActiveSection(ndx);
        moveToSection(ndx);
      }
    },
    prev() {
      let ndx = findNdxOfActiveEl(section, sectionActiveClass);
      if (ndx !==0) {
        ndx--;
        inScroll = true;
        changeActiveSection(ndx);
        moveToSection(ndx);
      }
    }
  };
};

document.addEventListener('wheel', (e) => {
  
  const scrollMethods = viewportScroller();
  
  if (e.deltaY>0 && !inScroll) {
    scrollMethods.next();
  } else if (e.deltaY<0 && !inScroll) {
    scrollMethods.prev();
  }
  
})

$(window).on('keydown', e => {
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === 'input' || tagName === 'textarea';
  const scrollMethods = viewportScroller();

  if (userTypingInInputs) return;

  switch(e.keyCode){
  case 38: scrollMethods.prev();
    break;
  case 40: scrollMethods.next();
    break;
  }
});


$('[data-scroll-to]').on('click', e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const reqSectionNdx = $(`[data-section-id = ${target}]`).index();
  changeActiveSection(reqSectionNdx);
  moveToSection(reqSectionNdx);
});

$(window).on('transitionend',()=> inScroll=false);


if(isMobile) {
//https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

$('.wrapper').on('touchmove', e => {e.preventDefault()});

// (passiveSupported && (active || el == window.document || el == window.document.body || el == window)) ? el.addEventListener(name, fn, { passive: false, capture: bubble }) : el.addEventListener(name, fn, bubble || false);

  $("body").swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      const scrollMethods = viewportScroller();
      let scrollDirection = '';

      if (direction === 'down') {scrollDirection = 'prev'};
      if (direction === 'up') {scrollDirection = 'next'};
      
      scrollMethods[scrollDirection](); 
    }
  });
  //Set some options later
  //$("#test").swipe( {fingers:2} );
};


})()


  

