/* Foundation */
$(document).foundation();

/* Header Border */
function pageFunc() {
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
}

pageFunc();

/* Works Section */

/* Barba.js */
var FadeTransition = Barba.BaseTransition.extend({
  start: function() {
    Promise
      .all([this.newContainerLoading, this.fadeOut()])
      .then(this.fadeIn.bind(this));
  },

  fadeOut: function() {
    return $(this.oldContainer).animate({ opacity: 0 }).promise();
  },

  fadeIn: function() {
    var _this = this;
    var $el = $(this.newContainer);

    $(this.oldContainer).hide();
    document.body.scrollTop = 0;

    $el.css({
      visibility : 'visible',
      opacity : 0
    });

    $el.animate({ opacity: 1 }, 800, function() {
      _this.done();
    });
  }
});

Barba.Pjax.getTransition = function() {
  return FadeTransition;
};

Barba.Pjax.start();

Barba.Dispatcher.on('transitionCompleted', function() {
  pageFunc();
});

// Ripple Effect

class RippleEffect {
  constructor(triggerClass = 'modal-trigger') {
    this.triggerClass = triggerClass;
    const $body = document.body;
    
    let $rippleContainer = document.createElement('div');
    this.ripple = document.createElement('div');
    
    $rippleContainer.classList.add('ripple-container');
    this.ripple.classList.add('ripple');
    
    $rippleContainer.appendChild(this.ripple);
    $body.appendChild($rippleContainer);
        
    this.animationStart = 0;
    this.activeModal = null;
    
    this._setRippleSize();
    this._initEvents();
  }
  
  _setRippleSize() {
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let s = (w > h) ? w * 2 : h * 2;
    
    this.ripple.style.width = s + 'px';
    this.ripple.style.height = s + 'px';
  }
  
  _initEvents() {
    window.addEventListener('resize', () => this._setRippleSize(), false);
    document.body.addEventListener('click', (evt) => this._handleClicks(evt), false);
  }
  
  _handleClicks(evt) {
    let target = evt.target;
    this.animationStart = 0;
    
    if (target.classList.contains(this.triggerClass)) {
      let clickTop = evt.clientY;
      let clickLeft = evt.clientX;
      
      this.ripple.style.left = clickLeft + 'px';
      this.ripple.style.top = clickTop + 'px';
      this.ripple.classList.add('is-animating');
      
      window.requestAnimationFrame(this._triggerAnimation.bind(this));
    }
  }
  
  _triggerAnimation(timestamp) {
    if (!this.animationStart) {
      this.animationStart = timestamp;
    }
    
    let progress = timestamp - this.animationStart;
    if (progress > 1000 ) {
      this.ripple.classList.remove('is-animating');
      return true;
    } 
    
    window.requestAnimationFrame(this._triggerAnimation.bind(this));  
  }
}

(function() {
  new RippleEffect();
})();

/** RAF Polyfill **/
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());