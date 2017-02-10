/* Foundation */
$(document).foundation();

/* Header Border */
$(window).on("scroll", function () {
  if($(this).scrollTop() > $(window).height()-200) {
    $('.page-header').addClass("scrolled");
  } else {
    $('.page-header').removeClass("scrolled");
  }
});

/* Smooth Scroll Function */
$('a[href^="#"]').click(function() {
   var speed = 500;
   var href= $(this).attr("href");
   var target = $(href == "#" || href == "" ? 'html' : href);
   var position = target.offset().top-$('header').height()-30;

   $('body,html').animate({scrollTop:position}, speed, 'swing');
   return false;
});

/* burger icon */
let clickDelay = 500;
let clickDelayTimer = null;

$('.burger-click-region').on('click', function() {
  if(clickDelayTimer === null) {
    const $burger = $(this);
    $burger.css('margin-bottom', '18px');
    $burger.toggleClass('active');
    $burger.parent().toggleClass('is-open');

    if(!$burger.hasClass('active')) {
      $burger.css('margin-bottom', '12px');
      $burger.addClass('closing');
    }

    clickDelayTimer = setTimeout(() => {
      $burger.removeClass('closing');
      clearTimeout(clickDelayTimer);
      clickDelayTimer = null;
    }, clickDelay);
  }

if(!$(this).hasClass('active')) {
    $('.mobile-link-container').animate({opacity: 0, right: '-300px'}, 100);
    
  } else {
    $('.mobile-link-container').animate({opacity: 1})
                               .animate({right: 0}, 100);
  }
});

/* Works Section */

Barba.Pjax.start();