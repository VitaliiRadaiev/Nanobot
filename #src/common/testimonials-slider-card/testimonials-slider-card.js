{
    let testimonialsSliderCards = document.querySelectorAll('[data-slider="testimonials-slider-card"]');
    if(testimonialsSliderCards.length) {
        testimonialsSliderCards.forEach(slider => {
            let sliderData = new Swiper(slider.querySelector('.swiper'), {
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
        })
    }
}