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
            let btnLeft = carousel.querySelector('.carousel__shadow-left');
            let btnRight = carousel.querySelector('.carousel__shadow-right');

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
                        spaceBetween: 85,
                        centeredSlides: false,
                        autoHeight: false,
                    }
                },
                // navigation: {
                //     nextEl: carousel.querySelector('.carousel__shadow-right'),
                //     prevEl: carousel.querySelector('.carousel__shadow-left'),
                // },
            });

            setTimeout(() => {
                sliderData.update();
            },1000)
            function setButtonsVisibility(sliderData) {
                if(sliderData.isBeginning) {
                    btnLeft.classList.add('hide');
                } else {
                    btnLeft.classList.remove('hide');
                }
                if(sliderData.isEnd) {
                    btnRight.classList.add('hide');
                } else {
                    btnRight.classList.remove('hide');
                }
            }

            setButtonsVisibility(sliderData);

            sliderData.on('slideChange', () => {
                setButtonsVisibility(sliderData);
            })


            let idBtnRight = null;
            btnRight.addEventListener('mouseenter', () => {
                sliderData.slideNext();
                idBtnRight = setInterval(() => {
                    sliderData.slideNext();
                },1000)
            })
            btnRight.addEventListener('mouseleave', () => {
                clearInterval(idBtnRight);
            })

            let idBtnLeft = null;
            btnLeft.addEventListener('mouseenter', () => {
                sliderData.slidePrev();
                idBtnLeft = setInterval(() => {
                    sliderData.slidePrev();
                },1000)
            })
            btnLeft.addEventListener('mouseleave', () => {
                clearInterval(idBtnLeft);
            })
        })
    }
}