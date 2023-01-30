gsap.registerPlugin(ScrollTrigger);

jQuery(document).ready(function ($) {
	// CUSTOM STICKY CURSOR FOR SWIPER SLIDER DRAG
	var $mFollow = $(".mouse__follow"),
		$mVideo = $(".video__cursor");

	function followCursor(e) {
		TweenLite.to($mFollow, 0.3, {
			css: {
				left: e.pageX - 40,
				top: e.pageY - 15,
			},
		});
	}

	var flag = false;
	$($mVideo).mouseover(function () {
		flag = true;
		TweenLite.to($mFollow, 0.4, { scale: 1, autoAlpha: 1 });
		$($mVideo).on("mousemove", followCursor);
	});
	$($mVideo).mouseout(function () {
		flag = false;
		TweenLite.to($mFollow, 0.4, { scale: 0.1, autoAlpha: 0 });
	});

	// CUSTOM STICKY CURSOR FOR SWIPER SLIDER DRAG
	var $circle = $(".mouse__circle"),
		$wrapper = $(".drag__cursor");

	function moveCircle(e) {
		TweenLite.to($circle, 0.3, {
			css: {
				left: e.pageX - 40,
				top: e.pageY - 15,
			},
		});
	}

	var flag = false;
	$($wrapper).mouseover(function () {
		flag = true;
		TweenLite.to($circle, 0.4, { scale: 1, autoAlpha: 1 });
		$($wrapper).on("mousemove", moveCircle);
	});
	$($wrapper).mouseout(function () {
		flag = false;
		TweenLite.to($circle, 0.4, { scale: 0.1, autoAlpha: 0 });
	});

	// Slider
	var swiperSlider = new Swiper(".full__slider", {
		effect: "fade",
		fadeEffect: {
			crossFade: true,
		},
		speed: 1500,
		centeredSlides: true,
		updateOnWindowResize: true,
		autoplay: {
			delay: 7000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".control__next",
			prevEl: ".control__previous",
		},
	});

	// Homepage Project Carousel
	var swiperProject = new Swiper(".projects__container", {
		observer: true,
		observeParents: true,
		spaceBetween: 0,
		grabCursor: false,
		freeMode: false,
		updateOnWindowResize: true,
		navigation: {
			nextEl: ".control__next",
			prevEl: ".control__previous",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
			type: "fraction",
		},
		breakpoints: {
			320: {
				slidesPerView: 1.1,
				spaceBetween: 5,
			},
			768: {
				slidesPerView: 2.2,
				spaceBetween: 5,
			},
			980: {
				slidesPerView: "auto",
			},
		},
	});

	// Award Timeline
	var swiperAward = new Swiper(".timeline__slider", {
		observer: true,
		observeParents: true,
		spaceBetween: 0,
		grabCursor: false,
		freeMode: false,
		updateOnWindowResize: true,
		breakpoints: {
			320: {
				slidesPerView: 1.1,
			},
			768: {
				slidesPerView: 2.2,
			},
			980: {
				slidesPerView: 3.5,
			},
		},
	});

	$(".hover__button").each(function () {
		$(this).insertAfter($(this).parent().find(".project__card--image img"));
	});

	// HomepageJS
	if ($("body").hasClass("home")) {
		$(".element__white")
			.attr("data-elementcolor", "#FFFFFF")
			.attr("data-bgcolor", "#000000");
		$(".element__black")
			.attr("data-elementcolor", "#000000")
			.attr("data-bgcolor", "#FFFFFF");

		// ABOUT MARQUEE TEXT
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion)");
		let marqueeText = "";

		if (!prefersReducedMotion.matches) {
			gsap.to("#marqueeDataImage", {
				scrollTrigger: {
					trigger: ".about__wrapper",
					scrub: 0.25,
					start: "top bottom",
					end: "bottom top",
					ease: "power2",
				},
				xPercent: -25,
			});
		}

		gsap.utils.toArray("#marqueeDataImage").forEach((heading) => {
			ScrollTrigger.create({
				trigger: heading,
				start: "top center",
				end: "bottom 500px",
				toggleActions: "play reset play reset",
				ease: "power2",
				onEnter: () => marqueeText !== heading.textContent,
				onEnterBack: () => marqueeText !== heading.textContent,
			});
		});
	}
});

let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

// Initialize and add the map
function initMap() {
	const gmapPin = { lat: -33.8807262, lng: 151.2426194 };
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 17,
		center: gmapPin,
		mapId: "f6855de1bac56f97",
	});

	const contentString =
		'<div class="info__window">' +
		"<h4>Jorge Hrdina</h4>" +
		"<p>10/38 Manning Road, <br>Double Bay NSW 2028 Australia</p>" +
		"</div>";

	const infowindow = new google.maps.InfoWindow({
		content: contentString,
	});

	const iconBase =
		"https://jorgehrdinadev.wpengine.com/wp-content/themes/jorge-hrdina/assets/images/";
	const marker = new google.maps.Marker({
		position: gmapPin,
		map: map,
		icon: iconBase + "pin.svg",
	});

	marker.addListener("click", () => {
		infowindow.open({
			anchor: marker,
			map,
			shouldFocus: false,
		});
	});
}

let scrollRef = 0;

// section, logo & toggle menu icon color change on scroll
window.addEventListener("load", function () {
	if (jQuery("body").hasClass("home")) {
		jQuery(".fusion-header-wrapper .fusion-header").css(
			"background-color",
			"#000000"
		);
		jQuery(".fusion-toggle-icon-line").css("background-color", "#000");
	}

	const scrollBgColor = document.querySelectorAll("[data-bgcolor]");
	scrollBgColor.forEach((bgColorHeader, i) => {
		const prevBgColor =
			i === 0 ? "#FFFFFF" : scrollBgColor[i - 1].dataset.bgcolor;
		ScrollTrigger.create({
			trigger: bgColorHeader,
			start: "top 9%",
			onEnter: () => {
				if (jQuery(".fusion-header-wrapper").hasClass("fusion-is-sticky")) {
					gsap.to(".fusion-header", {
						backgroundColor: bgColorHeader.dataset.bgcolor,
						overwrite: "true",
					});
				}
			},
			onLeaveBack: () => {
				if (jQuery(".fusion-header-wrapper").hasClass("fusion-is-sticky")) {
					gsap.to(".fusion-header", {
						backgroundColor: prevBgColor,
						overwrite: "true",
					});
				}
			},
		});
	});

	const scrollHeaderElems = document.querySelectorAll("[data-elementcolor]");
});

// Delay loop video
if (jQuery("body").hasClass("home")) {
	var loopVid = document.getElementById("loopVideo");
	loopVid.addEventListener("canplay", function () {
		setTimeout(function () {
			loopVid.play();
		}, 2400);
	});
}

jQuery("body").on("click touchstart", function () {
	const videoElement = document.getElementById("loopVideo");
	if (videoElement.playing) {
		// video is already playing so do nothing
	} else {
		videoElement.play();
	}
});
