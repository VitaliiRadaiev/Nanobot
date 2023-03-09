{
    let promoHeaderBtnScrollDown = document.querySelector('.hero__btn-scroll');
    if(promoHeaderBtnScrollDown) {
        promoHeaderBtnScrollDown.addEventListener('click', (e) => {
            e.preventDefault();

            window.scrollTo({
                top: document.documentElement.clientHeight,
                behavior: 'smooth',
            })
        })
    }

    let bg = document.querySelector('.hero__bg');
    if(bg) {
        if(bg.children.length) {
            bg.classList.add('hero__bg--shadow');
        }
    }
}