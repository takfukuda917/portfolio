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
    $('.mobile-link-container').css('right', 0);
    $burger.toggleClass('active');
    $burger.parent().toggleClass('is-open');

    if(!$burger.hasClass('active')) {
      $burger.css('margin-bottom', '12px');
      $('.mobile-link-container').css('opacity', 0);
      $('.mobile-link-container').css('right', '-500px');
      $burger.addClass('closing');
    }

    clickDelayTimer = setTimeout(() => {
      $burger.removeClass('closing');
      clearTimeout(clickDelayTimer);
      clickDelayTimer = null;
    }, clickDelay);
  }
});

/* Works Section */
