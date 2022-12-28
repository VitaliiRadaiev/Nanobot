let header = document.querySelector('[data-header]');
let menuToggleBtn = document.querySelector('[data-action="toggle-menu"]');
let menu = document.querySelector('[data-menu]')

if (header) {

    window.addEventListener('scroll', () => {
        header.classList.toggle('header--is-scroll', window.pageYOffset > 50);
    })

}

if (menu) {
    let mobileMenuNavSubItems = menu.querySelectorAll('.menu-item-has-children');

    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', () => {
            menuToggleBtn.classList.toggle('menu-is-open');
            menu.classList.toggle('header-menu--open');

            if (document.documentElement.clientWidth < 992) {
                document.body.classList.toggle('overflow-hidden');
            }
        })
    }

    if(mobileMenuNavSubItems.length) {
        mobileMenuNavSubItems.forEach(item => {
            let link = item.querySelector('.menu__link');
            let subMenu = item.querySelector('.sub-menu');
    
            if (link && subMenu) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    item.classList.toggle('active');
                    link.classList.toggle('active');
                    this.utils.slideToggle(subMenu);
    
                    mobileMenuNavSubItems.forEach(i => {
                        if (i === item) return;
    
                        let link = i.querySelector('.menu__link');
                        let subMenu = i.querySelector('.sub-menu');
    
                        i.classList.remove('active');
                        link.classList.remove('active');
                        this.utils.slideUp(subMenu);
                    })
                })
            }
        })
    }
}