$(document).ready( ( function() {

  $(window).on('scroll', (e) => {
    var current = ($(this).scrollTop());
    if ($(this).scrollTop()>current){
      console.log('down')
    } else {
      console.log('up');
    }
  })

}));