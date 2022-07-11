$(document).ready(function () {
  $(window).on("resize", function () {
    triggerFlickity();
  });

  function triggerFlickity() {
    if ($(window).width() > 767) {
      // Play with this value to change the speed
      let tickerSpeed = 1;

      let flickity = null;
      let flickity2 = null;
      let isPaused = false;
      const slideshowEl = document.querySelector(".js-slideshow");
      const slideshowEl2 = document.querySelector(".js-slideshow2");

      //   Functions
      const update = () => {
        if (isPaused) return;
        if (flickity.slides) {
          flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
          flickity.selectedIndex = flickity.dragEndRestingSelect();
          flickity.updateSelectedSlide();
          flickity.settle(flickity.x);
        }
        if (flickity2.slides) {
          flickity2.x = (flickity2.x - tickerSpeed) % flickity2.slideableWidth;
          flickity2.selectedIndex = flickity2.dragEndRestingSelect();
          flickity2.updateSelectedSlide();
          flickity2.settle(flickity2.x);
        }
        window.requestAnimationFrame(update);
      };

      const pause = () => {
        isPaused = true;
      };

      const play = () => {
        if (isPaused) {
          isPaused = false;
          window.requestAnimationFrame(update);
        }
      };

      //   Create Flickity
      flickity = new Flickity(slideshowEl, {
        autoPlay: false,
        prevNextButtons: false,
        pageDots: false,
        draggable: true,
        wrapAround: true,
        selectedAttraction: 0.015,
        friction: 0.25,
      });
      flickity.x = 0;

      flickity2 = new Flickity(slideshowEl2, {
        autoPlay: false,
        prevNextButtons: false,
        pageDots: false,
        draggable: true,
        wrapAround: true,
        selectedAttraction: 0.015,
        friction: 0.25,
        rightToLeft: true,
      });
      flickity2.x = 0;

      //   Add Event Listeners
      slideshowEl.addEventListener("mouseenter", pause, false);
      slideshowEl.addEventListener("focusin", pause, false);
      slideshowEl.addEventListener("mouseleave", play, false);
      slideshowEl.addEventListener("focusout", play, false);

      slideshowEl2.addEventListener("mouseenter", pause, false);
      slideshowEl2.addEventListener("focusin", pause, false);
      slideshowEl2.addEventListener("mouseleave", play, false);
      slideshowEl2.addEventListener("focusout", play, false);

      flickity.on("dragStart", () => {
        isPaused = true;
      });

      flickity2.on("dragStart", () => {
        isPaused = true;
      });

      //   Start Ticker
      update();
    }
  }

  triggerFlickity();

  // when click in anywhere in document close the navbar menu and clear the overlay from the body
  $("body").on("click", function (e) {
    var $currEl = $(e.currentTarget);
    if (!$currEl.is(".navbar") && !$currEl.closest(".navbar").length) {
      $(".navbar .hamburger").removeClass("is-active");
      $("body").removeClass("overlay");
      $(".navbar").removeClass("bg-white");
      $(".navbar-collapse").removeClass("active");
      $('.download-apps').removeClass('active')
    }
  });

  // make updating the year on footer
  $("#year-now").text(new Date().getFullYear());

  // stop propagation (closing navbar when click inside it) when click on navbar when the menu open in mobile screen
  $(".navbar").on("click", function (e) {
    e.stopPropagation();
  });

  // language dropdown
  $(".dropdown-menu a").on("click", function () {
    $(this)
      .addClass("active")
      .parent()
      .siblings()
      .find("a")
      .removeClass("active");
    // $(".language-dropdown .lang").html($(this).html());
    $('.dropdown-menu').removeClass('show')
  });

  // $('.login').on('click', function() {
  //   $('.download-apps').addClass('active')
  //   $("body").addClass("overlay");
  // })

  // $('.download-apps .close').on('click', function() {
  //   $('.download-apps').removeClass('active')
  //   $("body").removeClass("overlay");
  // })

  // menu toggle in navbar
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
    $("body").toggleClass("overlay");
    $(".navbar").toggleClass("bg-white");
    $(".navbar-collapse").toggleClass("active");
  });

  $("#footerDropdown").on("click", function () {
    $("#dropdown-menu2").toggleClass("show");
  });
  $("#navbarDropdown").on("click", function () {
    $("#dropdown-menu").toggleClass("show");
  });

  $(document).click(function () {
    $("#dropdown-menu,#dropdown-menu2").removeClass("show");
    $('.download-apps').removeClass('active')
  });

  /* Clicks within the dropdown won't make
     it past the dropdown itself */
  $("#dropdown,#dropdown2").click(function (e) {
    e.stopPropagation();
  });

  // show more button for devices in mobile screen
  let isHidden = true;
  $(".toggle-button").click(function () {
    if (isHidden) {
      $(this).find("span").text("Show less");
    } else {
      $(this).find("span").text("Show more");
    }

    isHidden = !isHidden;
    $(".reviews .hidden-item").each(function () {
      $(this).toggleClass("d-none");
    });
  });
  
});
