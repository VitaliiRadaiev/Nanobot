{
    const tabsNav = document.querySelectorAll('[data-slider="tabs-nav"]');
    if (tabsNav.length) {
        tabsNav.forEach(slider => {
            let mySwiper;

            function mobileSlider() {
                if (document.documentElement.clientWidth <= 767 && slider.dataset.mobile == 'false') {
                    mySwiper = new Swiper(slider, {
                        observer: true,
                        observeParents: true,
                        slidesPerView: 'auto',
                        watchOverflow: true,
                        watchSlidesVisibility: true,
                        freeMode: true,
                        slideToClickedSlide: true,
                    });

                    slider.dataset.mobile = 'true';
                }

                if (document.documentElement.clientWidth > 767) {
                    slider.dataset.mobile = 'false';

                    if (slider.classList.contains('swiper-initialized')) {
                        mySwiper.destroy();
                    }
                }
            }

            mobileSlider();

            window.addEventListener('resize', () => {
                mobileSlider();
            })
        })
    }
}