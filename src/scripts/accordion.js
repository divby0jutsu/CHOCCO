(function() {
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

$(window).on('resize', ()=> clear());


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
})()
