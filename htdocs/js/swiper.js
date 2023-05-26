let swiper = new Swiper(".reviews-wrap-1 .swiper-container", {
    loop: true,
    slidesPerView: 1,
    navigation: {
      nextEl: ".reviews-wrap-1 .swiper-button-next",
      prevEl: ".reviews-wrap-1 .swiper-button-prev",
    },
    breakpoints: {
      320: {
        spaceBetween: 10,
        slidesPerView: 1,
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 2,
      },
      1240: {
        spaceBetween: 20,
        slidesPerView: 3,
      }
    },
  });

  let swiper2 = new Swiper(".reviews-wrap-2 .swiper-container", {
    loop: true,
    slidesPerView: 1,
    navigation: {
      nextEl: ".reviews-wrap-2 .swiper-button-next",
      prevEl: ".reviews-wrap-2 .swiper-button-prev",
    },
    breakpoints: {
      320: {
        spaceBetween: 10,
        slidesPerView: 1,
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 2,
      },
      1240: {
        spaceBetween: 20,
        slidesPerView: 3,
      }
    },
  });