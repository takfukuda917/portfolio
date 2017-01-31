/* Foundation */
$(document).foundation();

/* burger icon */

let clickDelay = 500;
let clickDelayTimer = null;

$('.burger-click-region').on('click', function() {
  if(clickDelayTimer === null) {
    const $burger = $(this);
    $burger.css('margin-bottom', '18px');
    $('.mobile-link-container').css('opacity', 1);
    $burger.toggleClass('active');
    $burger.parent().toggleClass('is-open');

    if(!$burger.hasClass('active')) {
      $burger.css('margin-bottom', '12px');
      $('.mobile-link-container').css('opacity', 0);
      $burger.addClass('closing');
    }

    clickDelayTimer = setTimeout(function () {
      $burger.removeClass('closing');
      clearTimeout(clickDelayTimer);
      clickDelayTimer = null;
    }, clickDelay);
  }
});