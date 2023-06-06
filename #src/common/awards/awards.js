{
    let awards = document.querySelector('[data-slider="awards"]');
    if(awards) {
        let btnLeft = awards.querySelector('.awards__shadow-left');
        let btnRight = awards.querySelector('.awards__shadow-right');

        let sliderData = new Swiper(awards.querySelector('.swiper'), {
            speed: 600,
            navigation: {
                nextEl: btnRight,
                prevEl: btnLeft,
            },
            breakpoints: {
                320: {
                    slidesPerView: 'auto',
                    spaceBetween: 50,
                    centeredSlides: true,
                },
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 95,
                    centeredSlides: false,
                }
            }
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

        sliderData.on('afterInit', () => {
            setButtonsVisibility(sliderData);
        })
        sliderData.on('transitionStart', (sliderData) => {
            setButtonsVisibility(sliderData);
        })


        // let idBtnRight = null;
        // btnRight.addEventListener('mouseenter', () => {
        //     sliderData.slideNext();
        //     idBtnRight = setInterval(() => {
        //         sliderData.slideNext();
        //     },1000)
        // })
        // btnRight.addEventListener('mouseleave', () => {
        //     clearInterval(idBtnRight);
        // })

        // let idBtnLeft = null;
        // btnLeft.addEventListener('mouseenter', () => {
        //     sliderData.slidePrev();
        //     idBtnLeft = setInterval(() => {
        //         sliderData.slidePrev();
        //     },1000)
        // })
        // btnLeft.addEventListener('mouseleave', () => {
        //     clearInterval(idBtnLeft);
        // })
    }
}