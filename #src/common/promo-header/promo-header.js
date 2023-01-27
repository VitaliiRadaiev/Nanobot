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
}