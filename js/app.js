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


/* Barba.js */
var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    /**
     * This function is automatically called as soon the Transition starts
     * this.newContainerLoading is a Promise for the loading of the new container
     * (Barba.js also comes with an handy Promise polyfill!)
     */

    // As soon the loading is finished and the old page is faded out, let's fade the new page
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
    /**
     * this.oldContainer is the HTMLElement of the old Container
     */

    return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },

  fadeIn: function() {
    /**
     * this.newContainer is the HTMLElement of the new Container
     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
     * Please note, newContainer is available just after newContainerLoading is resolved!
     */

    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();
    document.body.scrollTop = 0;

    $el.css({
      visibility : 'visible',
      opacity : 0
    });

    $el.animate({ opacity: 1 }, 400, function() {
      /**
       * Do not forget to call .done() as soon your transition is finished!
       * .done() will automatically remove from the DOM the old Container
       */

      _this.done();
    });
  }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
  /**
   * Here you can use your own logic!
   * For example you can use different Transition based on the current page or link...
   */

  return FadeTransition;
};

Barba.Pjax.start();