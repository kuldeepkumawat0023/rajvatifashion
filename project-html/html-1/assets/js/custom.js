

jQuery(function () {

	jQuery(window).scroll(function () {
		if (jQuery(this).scrollTop()) {
			jQuery('#back-top').fadeIn();
		} else {
			jQuery('#back-top').fadeOut();
		}
	});

	jQuery("#back-top").click(function () {
		//1 second of animation time
		//html works for FFX but not Chrome
		//body works for Chrome but not FFX
		//This strange selector seems to work universally
		jQuery("html, body").animate({ scrollTop: 0 }, 1500);

	});
	jQuery('#back-bottom').on('click', function() {
		var headerHeight = jQuery('#myHeader').outerHeight();
		var target = jQuery(this).attr('href');
		var offsetTop = jQuery(target).offset().top;
		offsetTop = offsetTop - headerHeight;
		jQuery('html, body').animate({ scrollTop: offsetTop}, 1500);
	});
	
jQuery(document).ready(function () {
    jQuery("button.navbar-toggle").on("click", function () {
      jQuery("body").toggleClass("open-menu");
    });
  });

});
  
jQuery(window).scroll(function () {
  var sticky = jQuery("#myHeader"),
    scroll = jQuery(window).scrollTop();
  if (scroll >= 5) {
    sticky.addClass("sticky");
  } else {
    sticky.removeClass("sticky");
  }
});

  jQuery(window).scroll(function () {
  var sticky = jQuery(".best-seller-left"),
    scroll = jQuery(window).scrollTop();
  if (scroll >= 5) {
    sticky.addClass("sticky");
  } else {
    sticky.removeClass("sticky");
  }
});

    jQuery(document).on('click', '.size-chart-link', function (e) {
        e.preventDefault();
        var modalEl = document.getElementById('sizeChartModal');
        if (modalEl && typeof bootstrap !== 'undefined') {
            bootstrap.Modal.getOrCreateInstance(modalEl).show();
        }
    });

    jQuery(document).on('click', '.product-gallery-thumbs a', function (e) {
        e.preventDefault();
        var $thumb = jQuery(this);
        var newSrc = $thumb.data('image') || $thumb.find('img').attr('src');
        var $main = $thumb.closest('.product-gallery-wrap').find('.product-gallery-main img');
        var $mainLink = $thumb.closest('.product-gallery-wrap').find('.product-gallery-main a');
        $main.stop(true, true).fadeOut(150, function () {
            jQuery(this).attr('src', newSrc).fadeIn(200);
        });
        $mainLink.attr('href', newSrc);
        $thumb.closest('ul').find('li').removeClass('active');
        $thumb.closest('li').addClass('active');
    });

    jQuery('.trending-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        dots: false,
        arrows: true,

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });



const range = document.querySelector(".price-range");
const inputs = document.querySelectorAll(".price-input");

range.addEventListener("input", () => {
  let value = range.value;
  
  inputs[0].value = 599;        // min fix (agar single slider use kar rahe ho)
  inputs[1].value = value;    // max update
});

inputs[1].addEventListener("input", () => {
  range.value = inputs[1].value;
});
