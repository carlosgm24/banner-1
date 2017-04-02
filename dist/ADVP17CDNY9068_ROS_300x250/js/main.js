
 // Following is a SuperClass for your app
var LTApp = function() {
    this.INITED = false;
};

 // Images preloading functions
LTApp.prototype = {
    preload: function(sources, callback) {
        this.sources = sources;
        var imgcount = 0,
            img;
        $('*').each(function(i, el) {
            if (el.tagName !== 'SCRIPT' && el.tagName !== 'feMergeNode') {
                this.findImageInElement(el);
            }
        }.bind(this));
        if (this.sources.length === 0) {
            callback.call();
        } else if (document.images) {
            for (var i = 0; i < this.sources.length; i++) {
                img = new Image();
                img.onload = function() {
                    imgcount++;
                    if (imgcount === this.sources.length) {
                        callback.call();
                    }
                }.bind(this);
                img.src = this.sources[i];
            }
        } else {
            callback.call();
        }
    },
    determineUrl: function(element) {
        var url = '';
        var t;
        var style = element.currentStyle || window.getComputedStyle(element, null);

        if ((style.backgroundImage !== '' && style.backgroundImage !== 'none') || (element.style.backgroundImage !== '' && element.style.backgroundImage !== 'none')) {
            t = (style.backgroundImage || element.style.backgroundImage);
            if (t.indexOf('gradient(') === -1) {
                url = t.split(',');
            }
        } else if (typeof(element.getAttribute('src')) !== 'undefined' && element.nodeName.toLowerCase() === 'img') {
            url = element.getAttribute('src');
        }
        return [].concat(url);
    },
    findImageInElement: function(element) {
        var urls = this.determineUrl(element);
        var extra = (navigator.userAgent.match(/msie/i) || navigator.userAgent.match(/Opera/i)) ? '?rand=' + Math.random() : '';
        urls.forEach(function(url) {
            url = this.stripUrl(url);
            if (url !== '') {
                this.sources.push(url + extra);
            }
        }.bind(this));


    },
    stripUrl: function(url) {
        url = $.trim(url);
        url = url.replace(/url\(\"/g, '');
        url = url.replace(/url\(/g, '');
        url = url.replace(/\"\)/g, '');
        url = url.replace(/\)/g, '');
        return url;
    }
};
'use strict';

/**
 *
 * Main Application
 *
 **/

function App_banner() {
  if (App_banner.instance !== undefined) {
    return App_banner.instance;
  } else {
    App_banner.instance = this;
  }
  LTApp.call(this);
  return App_banner.instance;
}
App_banner.prototype = new LTApp();
App_banner.fn = App_banner.prototype;

/**
 *
 * Singleton thing
 *
 **/
App_banner.getInstance = function() {
  if (App_banner.instance === undefined) {
    new App_banner();
  }
  return App_banner.instance;
}

/**
 *
 * Initialize your app, surcharge with whatever needed
 *
 **/
App_banner.fn.init = function() {
  if (!this.INITED) {
    this.INITED = true;

    /**
     * Add the images url you want to preload in the empty array on the first parameter
     */
    this.preload([], this.display.bind(this));

    this.zoomIn = {
      scaleX: 1,
      scaleY: 1,
      ease: Power1.easeOut
    };
    this.opacityIn = {
      opacity: 1
    };
    this.heightIn = {
      height: 23
    };
    this.displayBlock = {
      display: 'block'
    };
    this.zoomOut = {
      scaleX: 0,
      scaleY: 0,
      ease: Power1.easeOut
    };
    this.opacityOut = {
      opacity: 0
    };
  }
};

/**
 *
 * shows everything, start animating
 *
 **/
App_banner.fn.display = function() {
  this.steps = $('.step');
  this.goTo(1);
  $('body').removeClass('loading');
  $('body').addClass('loaded');
};

/**
 *
 * Display the given step
 *
 */
App_banner.fn.goTo = function(stepNumber) { 
  this.steps.each(function(i, el) {
    var $el = $(el);

    if ($el.data('order') == stepNumber) {
      $('.step-active').removeClass('step-active');
      $el.addClass('step-active');
    }
  });

  if (this['step' + stepNumber]) {
    this['step' + stepNumber]();
  }
};

/**
 *
 * Display the given step
 *
 */
App_banner.fn.goToAndWait = function(stepNumber, seconds) {
  this.steps.each(function(i, el) {
    var $el = $(el);
    var $old;

    if ($el.data('order') == stepNumber) {
      $old = $('.step-active');
      $el.addClass('step-active');

      setTimeout(function() {
        $old.removeClass('step-active');
      }, seconds);
    }
  });

  if (this['step' + stepNumber]) {
    this['step' + stepNumber]();
  }
};


App_banner.fn.step1 = function() {

  var tl      = new TimelineMax(),

  frame1          = $('.frame1-container'),
  frame1Title          = frame1.find('.title'),
  frame2          = $('.frame2-container'),
  frame2Title          = frame2.find('.title'),
  frame3          = $('.frame3-container'),
  frame3Title          = frame3.find('.title'),
  frame3Subtitle          = frame3.find('.subtitle'),
  frame3Disclaimer          = frame3.find('.disclaimer'),
  frame4         = $('.frame4-container'),
  frame4Title          = frame4.find('.title'),
  packShot          = frame4.find('.pack-shot'),
  frame5         = $('.frame5-container'),
  frame5Title          = frame5.find('.title'),
  frame5Subtitle          = frame5.find('.subtitle'),
  frame5Cta          = frame5.find('.cta'),
  frame5Legal          = frame5.find('.legal'),
  frame5Logo         = frame5.find('.pfizer-logo'),
  frame5Disclaimer         = frame5.find('.disclaimer'),
  exitBtn         = $('.main-container');

  // frame5Cta.on('click', App_banner.fn.ctaExitHandler);
  exitBtn.on('click', App_banner.fn.mainExitHandler);

  var frameWidth = 65, numCols = 32, sNumCols = 19, cNumCols = 13;
  var steppedEase = new SteppedEase(numCols);
  var steppedEaseS = new SteppedEase(sNumCols);
  var steppedEaseC = new SteppedEase(cNumCols);

  window.tl = tl;

  tl.addLabel('intro', '+=0.5')
    .fromTo(frame1, 1.0, {x:-500, force3D: true, rotationZ:'0.01deg', ease: Power2.easeInOut }, {x:400, force3D: true, rotationZ:'0.01deg', ease: Power2.easeInOut },'intro')
    .set(frame1, {css:{position:'absolute'}}, '+=0.0')
    .from(frame2Title, 0.75, {opacity: 0, y: -100, scaleX: 0.8, scaleY: 0.8, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, '+=0.5')
    .to(frame2Title, 0.75, {opacity: 0, scaleX: 0.8, scaleY: 0.8, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, '+=1.5')

    .addLabel('frame3', '-=1.0')
    .from(frame3Title, 2.0, {x: 350, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame3+=0.5')
    .from(frame3Subtitle, 2.0, {x: 350, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame3+=0.5')
    .from(frame3Disclaimer, 0.5, {opacity: 0, scaleX: 0.8, scaleY: 0.8, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame3+=1.5')
    .to(frame3Title, 0.5, {opacity: 0, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame3+=6.0')
    .to(frame3Subtitle, 0.5, {opacity: 0, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame3+=6.0')
    .to(frame3Disclaimer, 0.5, {opacity: 0, scaleX: 0.8, scaleY: 0.8, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame3+=6.0')

    .addLabel('frame4', '-=1.0')
    .from(frame4Title, 0.5, {opacity: 0, scaleX: 0.8, scaleY: 0.8, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame4+=1.0')
    .from(packShot, 0.5, {x: 350, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame4+=1.0')
    .to(frame4Title, 0.5, {opacity: 0, scaleX: 0.8, scaleY: 0.8, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame4+=4.0')

    .addLabel('frame5', '-=1.0')
    .to(packShot, 0.5, {x: -60, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame5+=1.5')
    .from(frame5Title, 0.5, {opacity: 0, scaleX: 0.8, scaleY: 0.8, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame5+=1.5')
    .from(frame5Subtitle, 0.5, {x: 350, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame5+=1.5')
    .from(frame5Disclaimer, 0.5, {x: 350, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame5+=1.5')
    .from(frame5Cta, 0.5, {x: 350, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame5+=1.5')
    .from(frame5Legal, 0.5, {x: 350, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame5+=1.5')
    .from(frame5Logo, 0.5, {x: 350, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame5+=1.5')
};

//Exit function Main
App_banner.fn.mainExitHandler = function(e) {
  e.preventDefault(); 
  Enabler.exit('Main Exit','http://advilaide.com/');
}

// //CTA function Handler
// App_banner.fn.ctaExitHandler = function(e) {
//   e.preventDefault(); 
//   Enabler.exit('CTA Exit','http://advilaide.com/');
// }


