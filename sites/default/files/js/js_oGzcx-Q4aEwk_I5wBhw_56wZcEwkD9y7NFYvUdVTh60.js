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
