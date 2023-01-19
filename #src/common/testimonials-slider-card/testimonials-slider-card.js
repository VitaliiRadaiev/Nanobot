{
    let testimonialsSliderCards = document.querySelectorAll('[data-slider="testimonials-slider-card"]');
    if(testimonialsSliderCards.length) {
        testimonialsSliderCards.forEach(slider => {
            let logos = slider.closest('.testimonials-slider-card').querySelector('.testimonials-slider-card__logo');
            let sliderDataText = new Swiper(slider.querySelector('.swiper'), {
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 20,
                autoHeight: true,
                speed: 600,
                loop: true,
                navigation: {
                    prevEl: slider.querySelector('.testimonials-slider-card__btn.prev'),
                    nextEl: slider.querySelector('.testimonials-slider-card__btn.next'),
                },
            });

            let sliderDataLogos = new Swiper(logos.querySelector('.swiper'), {
                observer: true,
                observeParents: true,
                effect: 'fade',
                slidesPerView: 1,
                spaceBetween: 20,
                autoHeight: true,
                speed: 600,
                loop: true,
            });

            sliderDataText.controller.control = sliderDataLogos;
        })
    }
}