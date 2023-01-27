{
    let carousels = document.querySelectorAll('[data-slider="carousel"]');
    if(carousels.length) {
        carousels.forEach(carousel => {
            let sliderData = new Swiper(carousel.querySelector('.swiper'), {
                speed: 600,
                breakpoints: {
                    320: {
                        slidesPerView: 'auto',
                        spaceBetween: 80,
                        centeredSlides: true,
                    },
                    768: {
                        slidesPerView: 'auto',
                        spaceBetween: 95,
                        centeredSlides: false,
                    }
                }
            });
        })
    }
}
{
    let carousels = document.querySelectorAll('[data-slider="carousel-second"]');
    if(carousels.length) {
        carousels.forEach(carousel => {
            let shadowBtnRight = carousel.querySelector('.awards__shadow-right');
        
            let sliderData = new Swiper(carousel.querySelector('.swiper'), {
                speed: 600,
                breakpoints: {
                    320: {
                        slidesPerView: 'auto',
                        spaceBetween: 30,
                        centeredSlides: true,
                        autoHeight: true,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                        centeredSlides: false,
                        autoHeight: false,
                    },
                    992: {
                        slidesPerView: 2,
                        spaceBetween: 95,
                        centeredSlides: false,
                        autoHeight: false,
                    }
                }
            });

            if(shadowBtnRight) {
                shadowBtnRight.addEventListener('mousemove', () => {
                    carousel.classList.add('awards--init');
                })
            }
        })
    }
}