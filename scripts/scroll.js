var diff, top = 0;


document.addEventListener('wheel', (e) => {
  console.log(e.deltaY);
})

// $(document).on('scroll',function (e) {
//   jQuery('html, body').animate({ scrollTop: 0 }, 'slow');
//   // event fired when scrolling is started
//   console.log('sfsdf');
//   var el = $(document);
//   top = el[0].scrollTop;
//   console.log(top);
// });
