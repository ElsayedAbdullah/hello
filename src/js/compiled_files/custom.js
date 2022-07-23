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
  $(".navbar").on("click", function (e) {
    e.stopPropagation();
  });

  // make updating the year on footer
  $("#year-now").text(new Date().getFullYear());

  // stop propagation (closing navbar when click inside it) when click on navbar when the menu open in mobile screen
  $(".download-apps").on("click", function (e) {
    e.stopPropagation();
  });

  // language dropdown
  $(".dropdown-menu a").on("click", function () {
    $(this).addClass("active").parent().siblings().find("a").removeClass("active");
    // $(".language-dropdown .lang").html($(this).html());
    $(".dropdown-menu").removeClass("show");
  });

  $("button.download-app").on("click", function () {
    $(".download-apps").addClass("active");
    $(".search-header").css("z-index", "1");
    $("body").addClass("overlay");
  });

  $(".download-apps .close").on("click", function () {
    $(".download-apps").removeClass("active");
    $(".search-header").css("z-index", "6");
    $("body").removeClass("overlay");
  });

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
  $("#userDropdown").on("click", function () {
    $(this).addClass("active");
    $("#user-dropdown-menu").toggleClass("show");
  });

  $(document).click(function () {
    $("#dropdown-menu,#dropdown-menu2,#user-dropdown-menu").removeClass("show");
    // $(".download-apps,#userDropdown").removeClass("active");
    // $(".search-header").css("z-index", "6");
  });

  /* Clicks within the dropdown won't make
     it past the dropdown itself */
  $("#lang-dropdown,#lang-dropdown2,#user-dropdown").click(function (e) {
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
