(function ($) {
	
	"use strict";

	// Page loading animation
	$(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });


	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	})

	$('.owl-banner').owlCarousel({
	  center: true,
      items:1,
      loop:true,
      nav: true,
	  dots:true,
	  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      margin:30,
      responsive:{
        992:{
            items:1
        },
		1200:{
			items:1
		}
      }
	});

	var width = $(window).width();
		$(window).resize(function() {
		if (width > 767 && $(window).width() < 767) {
			location.reload();
		}
		else if (width < 767 && $(window).width() > 767) {
			location.reload();
		}
	})

	const elem = document.querySelector('.properties-box');
	const filtersElem = document.querySelector('.properties-filter');
	if (elem) {
		const rdn_events_list = new Isotope(elem, {
			itemSelector: '.properties-items',
			layoutMode: 'masonry'
		});
		if (filtersElem) {
			filtersElem.addEventListener('click', function(event) {
				if (!matchesSelector(event.target, 'a')) {
					return;
				}
				const filterValue = event.target.getAttribute('data-filter');
				rdn_events_list.arrange({
					filter: filterValue
				});
				filtersElem.querySelector('.is_active').classList.remove('is_active');
				event.target.classList.add('is_active');
				event.preventDefault();
			});
		}
	}


	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});
    
// Data JSON
var data = {
    "Bali": {"title": "30 Property", "desc": "3 Hotel, 15 Apartment, 12 House"},
    "Aceh": {"title": "3 Property", "desc": "1 Hotel, 2 House"},
    "Papua": {"title": "12 Property", "desc": "1 Hotel, 2 House"},
    "Riau": {"title": "3 Property", "desc": "1 Hotel, 2 House"},
    "Sulawesi Selatan": {"title": "4 Property", "desc": "1 Hotel, 2 House"},
    "Yogyakarta": {"title": "5 Property", "desc": "1 Hotel, 2 House"},
    "Kalimantan Barat": {"title": "10 Property", "desc": "1 Hotel, 2 House"},
    "Sulawesi Tenggara": {"title": "15 Property", "desc": "1 Hotel, 2 House"},
    // tambahkan data daerah lainnya
};

// Ambil semua elemen path SVG yang mewakili daerah-daerah
var paths = document.querySelectorAll('svg path');

// Iterasi melalui setiap path dan ubah warna fill berdasarkan data JSON
paths.forEach(function(path) {
    var regionName = path.getAttribute('title');
    if (data[regionName]) {
        path.style.fill = "#F35525";
		var tooltipContent = data[regionName];
		$(path).addClass('custom-element')
		$(path).attr('data-title', regionName + " " + tooltipContent.title);
		$(path).attr('data-desc', tooltipContent.desc);
    }
});

const customElements = document.querySelectorAll('.custom-element');
const customTooltip = document.getElementById('custom-tooltip');

customElements.forEach(customElement => {
  customElement.addEventListener('mouseover', function(event) {
    const title = event.target.getAttribute('data-title');
    const desc = event.target.getAttribute('data-desc');

    const tooltipTitle = document.getElementById('custom-tooltip-title');
    const tooltipDesc= document.getElementById('custom-tooltip-desc');
    
    tooltipTitle.innerText = title;
    tooltipDesc.innerText = desc;

    var tooltipWidth = customTooltip.offsetWidth;
    var mouseX = event.clientX;
    var windowWidth = window.innerWidth;

    // Menentukan posisi tooltip berdasarkan posisi kursor mouse
    if (mouseX > windowWidth / 2) {
        customTooltip.style.left = (mouseX - tooltipWidth - 20) + 'px'; // Menampilkan tooltip di sebelah kiri mouse
    } else {
        customTooltip.style.left = (mouseX + 20) + 'px'; // Menampilkan tooltip di sebelah kanan mouse
    }

    // Tetapkan posisi vertikal tooltip pada posisi kursor mouse
    customTooltip.style.top = (event.clientY + 20) + 'px'; // Menampilkan tooltip di bawah mouse
	
    customTooltip.style.display = 'block';
  });

  customElement.addEventListener('mousemove', function(event) {
    var tooltipWidth = customTooltip.offsetWidth;
    var mouseX = event.clientX;
    var windowWidth = window.innerWidth;

    // Menentukan posisi tooltip berdasarkan posisi kursor mouse
    if (mouseX > windowWidth / 2) {
        customTooltip.style.left = (mouseX - tooltipWidth - 20) + 'px'; // Menampilkan tooltip di sebelah kiri mouse
    } else {
        customTooltip.style.left = (mouseX + 20) + 'px'; // Menampilkan tooltip di sebelah kanan mouse
    }

    // Tetapkan posisi vertikal tooltip pada posisi kursor mouse
    customTooltip.style.top = (event.clientY + 20) + 'px'; // Menampilkan tooltip di bawah mouse
});

  customElement.addEventListener('mouseout', function(event) {
    customTooltip.style.display = 'none';
  });
});

})(window.jQuery);