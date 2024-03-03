(function ($) {

  "use strict";

  // Header Type = Fixed
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var box = $('.header-text').height();
    var header = $('header').height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });


  $('.owl-our-team').owlCarousel({
    items: 3,
    loop: true,
    dots: true,
    nav: false,
    autoplay: true,
    margin: 0,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      },
      1600: {
        items: 3
      }
    }
  })


  // Menu Dropdown Toggle
  if ($('.menu-trigger').length) {
    $(".menu-trigger").on('click', function () {
      $(this).toggleClass('active');
      $('.header-area .nav').slideToggle(200);
    });
  }


  // Menu elevator animation
  $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        var width = $(window).width();
        if (width < 991) {
          $('.menu-trigger').removeClass('active');
          $('.header-area .nav').slideUp(200);
        }
        $('html,body').animate({
          scrollTop: (target.offset().top) + 1
        }, 700);
        return false;
      }
    }
  });

  $(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll
    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $('.scroll-to-section a').each(function () {
        $(this).removeClass('active');
      })
      $(this).addClass('active');

      var target = this.hash,
        menu = target;
      var target = $(this.hash);
      $('html, body').stop().animate({
        scrollTop: (target.offset().top) + 1
      }, 500, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
      });
    });
  });

  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('.nav a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('.nav ul li a').removeClass("active");
        currLink.addClass("active");
      }
      else {
        currLink.removeClass("active");
      }
    });
  }



  // Page loading animation
  $(window).on('load', function () {

    $('#js-preloader').addClass('loaded');

  });



  // Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $('.submenu').on('click', function () {
      if (width < 767) {
        $('.submenu ul').removeClass('active');
        $(this).find('ul').toggleClass('active');
      }
    });
  }




})(window.jQuery);

function sendWhatsAppMessage(message) {
  // Define the WhatsApp API URL
  var apiURL = "https://api.whatsapp.com/send?phone=6281287734946&text=" + message;

  // Open WhatsApp API link in a new tab
  window.open(apiURL, '_blank');
}

document.getElementById('search').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Get the input value
  var question = document.getElementById('question').value;

  // Construct the WhatsApp message
  var message = encodeURIComponent("Question: " + question);

  // Call the reusable function to send WhatsApp message
  sendWhatsAppMessage(message);
});

document.getElementById('contact').addEventListener('submit', function () {
  // Get form data
  var name = document.getElementById('name').value;
  var surname = document.getElementById('surname').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;

  // Construct the WhatsApp message
  var whatsappMessage = encodeURIComponent(
    "Name: " + name + "\n" +
    "Surname: " + surname + "\n" +
    "Email: " + email + "\n" +
    "Message: " + message
  );

  // Call the sendWhatsAppMessage function with the constructed message
  sendWhatsAppMessage(whatsappMessage);
});


var textIndex = 0;
var texts = ["Code", "Build", "Deploy"];
var flipText = document.getElementById("flipText");

function flip() {
  flipText.classList.add("flipOut");
  setTimeout(function () {
    flipText.innerText = texts[textIndex];
    flipText.classList.remove("flipOut");
    textIndex = (textIndex + 1) % texts.length;
  }, 500); // Adjust timing accordingly
}

setInterval(flip, 2000); // Adjust interval accordingly

$('.modal-trigger').on('click', function () {
  // Mengambil src gambar dari img di dalam div yang sama
  var src = $(this).closest('.item').find('img').attr('src');
  // Mengambil judul dari H4 di dalam div yang sama
  var title = $(this).closest('.item').find('h4').text();
  // Mengambil deskripsi dari P di dalam div yang sama
  var description = $(this).closest('.item').find('p').text();
  // Mengganti src gambar di modal dengan src gambar yang diklik
  $('#modalImage').attr('src', src);
  // Mengganti judul modal dengan judul dari H4 yang diambil
  $('#imageModalLabel').text(title);
  // Mengganti deskripsi modal dengan deskripsi dari P yang diambil
  $('#modalDescription').text(description);
  // Menampilkan modal
  $('#imageModal').modal('show');
});