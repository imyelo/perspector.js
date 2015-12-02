(function (doc, cssText) {
    var styleEl = doc.createElement("style");
    doc.getElementsByTagName("head")[0].appendChild(styleEl);
    if (styleEl.styleSheet) {
        if (!styleEl.styleSheet.disabled) {
            styleEl.styleSheet.cssText = cssText;
        }
    } else {
        try {
            styleEl.innerHTML = cssText;
        } catch (ignore) {
            styleEl.innerText = cssText;
        }
    }
}(document, "html.perspector-plugin-document{height:100%;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;-webkit-perspective:1000px;perspective:1000px}.perspector-plugin-root{position:absolute;top:0;right:0;bottom:0;left:0}.perspector-plugin-root.play{box-shadow:10px 10px 10px 10px rgba(0,0,0,.2);-webkit-transform-origin:right center 0;transform-origin:right center 0;-webkit-transform:scale(.9) rotate3d(1,-10,0,60deg);transform:scale(.9) rotate3d(1,-10,0,60deg)}.perspector-plugin-root,.perspector-plugin-root *{-webkit-transition:all .4s ease;transition:all .4s ease;overflow:visible}.perspector-plugin-root .perspector-plugin-focus{-webkit-transform:translate3d(-10px,-10px,0);transform:translate3d(-10px,-10px,0);overflow:visible;z-index:10000}"));

$(function () {
  var CONSTANT = {
    ACTION_SWIM: 'swim',
    ACTION_SINK: 'sink',
    ACTION_SUBSCRIBE: 'subscribe',
    ACTION_UNSUBSCRIBE: 'unsubscribe',
    ACTION_SETUP: 'setup',
    ACTION_TEARDOWN: 'teardown',
    ANIMATE_SETUP_DURATION: 200,
    ANIMATE_TEARDOWN_DURATION: 200,
  };

  var isDocumentPerspective = false;

  var $root;

  function setup () {
    var $content = $('body').children();
    $('html').addClass('perspector-plugin-document');
    $root = $('<div>').addClass('perspector-plugin-root').appendTo('body');
    $root.append($content);
    setTimeout(function () {
      $root.addClass('play');
      isDocumentPerspective = true;
    }, CONSTANT.ANIMATE_SETUP_DURATION);
  }

  function teardown () {
    $root.removeClass('play');
    setTimeout(function () {
      $('html').removeClass('perspector-plugin-document');
      $('body').append($root.children());
      $root.remove();
      isDocumentPerspective = false;
    }, CONSTANT.ANIMATE_TEARDOWN_DURATION);
  }

  $.fn.extend({
    perspector: (function () {
      var enter = function (e) {
        $(e.currentTarget).perspector(CONSTANT.ACTION_SWIM);
      };
      var leave = function (e) {
        $(e.currentTarget).perspector(CONSTANT.ACTION_SINK);
      };
      return function (action) {
        if (action === CONSTANT.ACTION_SWIM) {
          return $(this).addClass('perspector-plugin-focus');
        }
        if (action === CONSTANT.ACTION_SINK) {
          return $(this).removeClass('perspector-plugin-focus');
        }
        if (action === CONSTANT.ACTION_SUBSCRIBE) {
          return $(this).on('mouseenter', enter).on('mouseleave', leave);
        }
        if (action === CONSTANT.ACTION_UNSUBSCRIBE) {
          return $(this).off('mouseenter', enter).off('mouseleave', leave);
        }
      };
    })()
  });

  $.extend({
    perspector: function (action) {
      if (action === CONSTANT.ACTION_SETUP) {
        if (isDocumentPerspective) {
          return;
        }
        return setup();
      }
      if (action === CONSTANT.ACTION_TEARDOWN) {
        return teardown();
      }
      if (arguments.length === 0) {
        return !isDocumentPerspective ? setup() : teardown();
      }
    }
  });
});
