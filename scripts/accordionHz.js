const recipeTitle = $('.recipe__title');
const closeRecipe = $('.recipe__close');
const recipeContent = $('.recipe__content');

const measureWidth = () => {
  const windowWidth = $(window).width();
  if(windowWidth>768) {
  return 500;
  } else if (windowWidth>480) {
    return windowWidth - recipeTitle.width()*recipeTitle.length;
  } else {
    return windowWidth - recipeTitle.width();
  }
};

//closes all elements in container by removing active class
const closeEl = (container, clss) => {
  container.removeClass(clss);
  recipeContent.width(0);
};

//returns all children of parent element with the same class as child element
const allChildrenWithClss = (childClss) => {
  return allElWithClss = $(childClss).parent().find(childClss);
}

//closes target element if it's open else closes all elements with active class and adds active class to target element
const toggleEl = (targetEl, closestEl, activeClss) => {
  $closest = targetEl.closest(closestEl);
  let allElWithClss = allChildrenWithClss(closestEl);
  ////
  let content = $($closest).find('.recipe__content');
    const width = measureWidth();

  if ($($closest).hasClass(activeClss)){
    closeEl(allElWithClss, activeClss);
    
  } 
  else {
  
    closeEl(allElWithClss, activeClss);
    content.width(width);
    $($closest).addClass(activeClss);
    
  }
};


recipeTitle.on('click', function(e){
  e.preventDefault();
  //
  $('.recipe__desc').outerWidth(measureWidth());
  //
  toggleEl(e.currentTarget,'.recipe', 'recipe--active');
  
});

closeRecipe.on('click', e => {
  e.preventDefault();
  closeEl(allChildrenWithClss('.recipe'), 'recipe--active');
});