{
    let promoHeaderBtnScrollDown = document.querySelector('.promo-header__btn-scroll');
    if(promoHeaderBtnScrollDown) {
        promoHeaderBtnScrollDown.addEventListener('click', (e) => {
            e.preventDefault();

            window.scrollTo({
                top: document.documentElement.clientHeight,
                behavior: 'smooth',
            })
        })
    }

    let bg = document.querySelector('.promo-header__bg');
    if(bg) {
        if(bg.children.length) {
            bg.classList.add('promo-header__bg--shadow');
        }
    }
}