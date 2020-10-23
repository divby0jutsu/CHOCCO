const recipeTitle = $('.recipe__title');
const closeRecipe = $('.recipe__close');

//closes all elements in container by removing active class
const closeEl = (container, clss) => {
  container.removeClass(clss);
};

//returns all children of parent element with the same class as child element
const allChildrenWithClss = (childClss) => {
  return allElWithClss = $(childClss).parent().find(childClss);
}

//closes target element if it's open else closes all elements with active class and adds active class to target element
const toggleEl = (targetEl, closestEl, activeClss) => {
   $closest = targetEl.closest(closestEl);
  let allElWithClss = allChildrenWithClss(closestEl);
  
  if ($($closest).hasClass(activeClss)){
    $($closest).removeClass(activeClss)
  } 
  else {
    closeEl(allElWithClss, activeClss);
    $($closest).addClass(activeClss);
  }
};


recipeTitle.on('click', function(e){
  e.preventDefault();
  toggleEl(e.currentTarget,'.recipe', 'recipe--active');
  
});

closeRecipe.on('click', (e) => {
  e.preventDefault();
  closeEl(allChildrenWithClss('.recipe'), 'recipe--active');
});
