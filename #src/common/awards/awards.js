{
    let awards = document.querySelector('[data-slider="awards"]');
    if(awards) {
        let shadowBtnRight = awards.querySelector('.awards__shadow-right');
        let sliderData = new Swiper(awards.querySelector('.swiper'), {
            speed: 600,
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

        if(shadowBtnRight) {
            shadowBtnRight.addEventListener('mousemove', () => {
                console.log('test');
                awards.classList.add('awards--init')
            })
        }
    }
}