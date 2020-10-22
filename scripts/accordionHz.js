const recipeTitle = $('.recipe__title');
const recipes = $('.recipe');
const closeRecipe = $('.recipe__close');

const close = () => {
  recipes.removeClass('recipe--active');
}

recipeTitle.on('click', function(e){
  e.preventDefault();
  close();

  let title = $(this);
  title.parent('.recipe').addClass('recipe--active');
});


closeRecipe.on('click', (e) => {
  e.preventDefault();
  close();
});
