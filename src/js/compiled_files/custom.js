$(document).ready(function () {
  // when click in anywhere in document close the navbar menu and clear the overlay from the body
  $("body").on("click", function (e) {
    var $currEl = $(e.currentTarget);
    if (!$currEl.is(".navbar") && !$currEl.closest(".navbar").length) {
      $(".navbar .hamburger").removeClass("is-active");
      $("body").removeClass("overlay");
      $(".navbar").removeClass("bg-white");
      $(".navbar-collapse").removeClass("active");
      $(".download-apps").removeClass("active");
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
    $(this).addClass("active").parent().siblings().find("a").removeClass("active");
    // $(".language-dropdown .lang").html($(this).html());
    $(".dropdown-menu").removeClass("show");
  });

  $('.download-app').on('click', function() {
    $('.download-apps').addClass('active')
    $("body").addClass("overlay");
  })

  $('.download-apps .close').on('click', function() {
    $('.download-apps').removeClass('active')
    $("body").removeClass("overlay");
  })

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
    $(".download-apps").removeClass("active");
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

  // -----Country Code Selection
  var telInput = $("#mobile_code_login");
  telInput.intlTelInput({
    separateDialCode: true,
    preventInvalidNumbers: true,
    initialCountry: "eg",
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.9/js/utils.js"
  });


  $(".login-wrapper .login-form").on("submit", function (e) {
    e.preventDefault();
    var inputvalue = $("#mobile_code_login").val();
    $("#tel").text(`"+${telInput.intlTelInput('getSelectedCountryData').dialCode} ${inputvalue}"`);
    if (inputvalue != "" && telInput.intlTelInput("isValidNumber")) {
      $(this).find(".send-otp").addClass("loading").html("<span class='spinner mr-2'></span><span>Sending OTP...</span>");
      setTimeout(() => {
        $(".login-form").hide();
        $(".otp-content").css("display", "flex");
        if ($(".otp-content").is(":visible")) {
          countdown();
        }
      }, 1000);
    } else {
      $("#phone-error").show().delay(3000).fadeOut();
    }
  });

  function countdown() {
    var seconds = 60;
    function tick() {
      var counter = document.getElementById("countdown");
      seconds--;
      counter.innerHTML = (seconds < 10 ? "0" : "") + String(seconds);
      if (seconds > 0) {
        setTimeout(tick, 1000);
      } else {
        $("#resend-counter").hide();
        $("#resend-again").show();
      }
    }
    tick();
  }

  // otp
  // Restricts input for the set of matched elements to the given inputFilter function.
  (function ($) {
    $.fn.inputFilter = function (callback, errMsg) {
      return this.on("input keydown keyup mousedown mouseup select contextmenu drop focusout", function (e) {
        if (callback(this.value)) {
          // Accepted value
          if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
            $(this).removeClass("input-error");
            this.setCustomValidity("");
          }
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          // Rejected value - restore the previous one
          $(this).addClass("input-error");
          // this.setCustomValidity(errMsg);
          this.reportValidity();
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);

          // show error message
          $("#digits-error").show().delay(3000).fadeOut();
        } else {
          // Rejected value - nothing to restore
          this.value = "";
        }
      });
    };
  })(jQuery);

  $(".otp-form input").inputFilter(function (value) {
    return /^\d*$/.test(value); // Allow digits only, using a RegExp
  }, "Only digits allowed");

  $(".digit-group")
    .find("input")
    .each(function () {
      $(this).attr("maxlength", 1);
      $(this).on("keyup", function (e) {
        var parent = $($(this).parent());

        if (e.keyCode === 8 || e.keyCode === 37) {
          var prev = parent.find("input#" + $(this).data("previous"));
          $(this).removeClass("valid");
          $(".verify-btn").attr("disabled", true);

          if (prev.length) {
            $(prev).select();
          }
        } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
          var next = parent.find("input#" + $(this).data("next"));

          $(this).addClass("valid");
          if ($(this).val()) {
            if (next.length) {
              $(next).select();
            } else {
              if (parent.data("autosubmit")) {
                var lastInput = $(".otp-form").find("input").last();
                if (!lastInput.hasClass("input-error") && lastInput.hasClass("valid")) {
                  $(".verify-btn").attr("disabled", false);
                }
                // to submit the form please set data-autosubmit custom attribut to true and uncomment the bottom line of code
                // parent.submit();
              }
            }
          }
        }
      });
    });

  $("#resend-again").click(function () {
    $("#resend-again").hide();
    countdown()
    $("#resend-counter").show();
  });
});
