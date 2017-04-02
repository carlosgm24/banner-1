
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
  frame1img1          = $('.frame1-container img:nth-child(1)'),
  frame1img2          = $('.frame1-container .special'),
  frame1img3          = $('.frame1-container img:nth-child(3)'),
  frame2          = $('.frame2-container'),
  frame2Title          = frame2.find('.title'),
  frame2img1          = $('.frame2-container img:nth-child(1)'),
  frame2img2          = $('.frame2-container img:nth-child(2)'),
  frame3          = $('.frame3-container'),
  frame3Title          = frame3.find('.title'),
  frame3img1          = $('.frame3-container img'),
  frame4         = $('.frame4-container'),
  frame4Title          = frame4.find('.title'),
  frame4img1         = $('.frame4-container img:nth-child(1)'),
  frame4img2         = $('.frame4-container img:nth-child(2)'),
  frame4p         = $('.frame4-container p'),
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
    .fromTo(frame1img1, 1.0, {x:-650, force3D: true, rotationZ:'0.01deg', ease: Power2.easeInOut }, {x:0, force3D: true, rotationZ:'0.01deg', ease: Power2.easeInOut },'intro')
    .from(frame1img2, 0.5, {opacity: 0, scaleX: 0.8, scaleY: 0.8, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut })
    .fromTo(frame1img3, 1.0, {x:650, force3D: true, rotationZ:'0.01deg', ease: Power2.easeInOut }, {x:0, force3D: true, rotationZ:'0.01deg', ease: Power2.easeInOut },'intro')
    .to(frame1img1, 0.5, {x:650, force3D: true, rotationZ:'0.01deg', ease: Power2.easeInOut }, 'intro+=3.0')
    .to(frame1img3, 0.5, {x:-650, force3D: true, rotationZ:'0.01deg', ease: Power2.easeInOut }, 'intro+=3.0')
    .set(frame1, {css:{position:'absolute'}}, '+=0.0')

    .addLabel('frame2', '-=1.0')
    .to(frame1img2, 2.0, {x: 65, y: -80, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame2+=1.5')
    .from(frame2img1, 2.0, {y: -500, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame2+=1.5')
    .from(frame2img2, 2.0, {x: -650, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame2+=1.5')
    .to(frame2img1, 2.0, {y: 0, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame2+=1.5')
    .to(frame2img2, 2.0, {x: 0, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame2+=1.5')

    .addLabel('frame3', '-=1.0')
    .from(frame3img1, 0.5, {opacity: 0, scaleX: 0.8, scaleY: 0.8, force3D: true, rotationZ:'0.01deg', ease: Power1.easeInOut }, 'frame3+=1.0')

    .addLabel('frame4', '-=1.0')
    .from(frame4img1, 0.5, {opacity: 0, scaleX: 0.8, scaleY: 0.8, force3D: true, rotationZ:'0.01deg', ease: Power2.easeInOut }, 'frame4+=1.0')
    .from(frame4img2, 0.5, {opacity: 0, y: -100, scaleX: 0.8, scaleY: 0.8, force3D: true, rotationZ:'0.01deg', ease: Power2.easeInOut }, 'frame4+=1.0')
    .from(frame4p, 0.5, {opacity: 0, scaleX: 0.8, scaleY: 0.8, force3D: true, rotationZ:'0.01deg', ease: Power2.easeInOut }, 'frame4+=1.0')
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


