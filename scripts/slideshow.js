const review = $(".review");
const reviewAvatar = $(".reviews__switch-item");

review.eq(0).addClass("review__item--active");
reviewAvatar.eq(0).addClass("interactive-avatar--active");

reviewAvatar.on("click", function(e) {
  const link = $(this);
  const ndx = link.index();
  e.preventDefault();
  link.addClass("interactive-avatar--active").siblings().removeClass("interactive-avatar--active");
  review.eq(ndx).addClass("review__item--active").siblings().removeClass("review__item--active");
});