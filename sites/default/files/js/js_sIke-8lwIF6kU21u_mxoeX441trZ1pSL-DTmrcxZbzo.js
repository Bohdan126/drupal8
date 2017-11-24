/* global a2a*/
(function (Drupal) {
  'use strict';

  Drupal.behaviors.addToAny = {
    attach: function (context, settings) {
      // If not the full document (it's probably AJAX), and window.a2a exists
      if (context !== document && window.a2a) {
        a2a.init_all('page'); // Init all uninitiated AddToAny instances
      }
    }
  };

})(Drupal);
;
(function ($) {
    Drupal.behaviors.backtotop = {
        attach: function (context, settings) {
            var exist = $('#backtotop').length;
            if (exist == 0) {
                $("body", context).once('backtotop').each(function () {
                    $('body').append("<div id='backtotop'>" + Drupal.t(settings.back_to_top.back_to_top_button_text) + "</div>");
                });
            }
            $(window).scroll(function () {
                if ($(this).scrollTop() > settings.back_to_top.back_to_top_button_trigger) {
                    $('#backtotop').fadeIn();
                } else {
                    $('#backtotop').fadeOut();
                }
            });

            $('#backtotop', context).once('backtotop').each(function () {
                $(this).click(function () {
                    $("html, body").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function () {
                        $('html, body').stop();
                    });
                    $('html,body').animate({scrollTop: 0}, 1200, 'easeOutQuart', function () {
                        $("html, body").unbind("scroll mousedown DOMMouseScroll mousewheel keyup");
                    });
                    return false;
                });
            });
        }
    };
})(jQuery);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, drupalSettings) {
  Drupal.behaviors.activeLinks = {
    attach: function attach(context) {
      var path = drupalSettings.path;
      var queryString = JSON.stringify(path.currentQuery);
      var querySelector = path.currentQuery ? '[data-drupal-link-query=\'' + queryString + '\']' : ':not([data-drupal-link-query])';
      var originalSelectors = ['[data-drupal-link-system-path="' + path.currentPath + '"]'];
      var selectors = void 0;

      if (path.isFront) {
        originalSelectors.push('[data-drupal-link-system-path="<front>"]');
      }

      selectors = [].concat(originalSelectors.map(function (selector) {
        return selector + ':not([hreflang])';
      }), originalSelectors.map(function (selector) {
        return selector + '[hreflang="' + path.currentLanguage + '"]';
      }));

      selectors = selectors.map(function (current) {
        return current + querySelector;
      });

      var activeLinks = context.querySelectorAll(selectors.join(','));
      var il = activeLinks.length;
      for (var i = 0; i < il; i++) {
        activeLinks[i].classList.add('is-active');
      }
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload') {
        var activeLinks = context.querySelectorAll('[data-drupal-link-system-path].is-active');
        var il = activeLinks.length;
        for (var i = 0; i < il; i++) {
          activeLinks[i].classList.remove('is-active');
        }
      }
    }
  };
})(Drupal, drupalSettings);;
