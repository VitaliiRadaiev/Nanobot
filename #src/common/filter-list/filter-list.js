const filterListSections = document.querySelectorAll('[data-filter-list]');
if (filterListSections.length) {

    filterListSections.forEach(filterListSection => {
        filterListSection.closest('.bg-decor')?.classList.add('filter-list-wrap');

        //init
        const allInputsRadio = filterListSection.querySelectorAll('input[type="radio"]');
        allInputsRadio.forEach(radio => {
            if (radio.checked) {
                radio.closest('.filter-list-nav__title')?.classList.add('active');
                radio.closest('.filter-list-nav__list-option')?.classList.add('active');
                radio.closest('.filter-list-nav__item')?.classList.add('selected');
            }
        })

        filterListSection.addEventListener('change', (e) => {
            if (!e.target.closest('input[type="radio"]')) return;

            const radio = e.target.closest('input[type="radio"]');
            if (!radio.checked) return;

            if (radio.closest('.filter-list-nav__list-option')) {
                const btn = radio.closest('.filter-list-nav__list-option');
                const parentList = btn.closest('.filter-list-nav__list');
                const parent = parentList.closest('.filter-list-nav__item');
                const currentValueEl = parent.querySelector('.filter-list-nav__current-value');

                parentList.querySelectorAll('.filter-list-nav__list-option.active')
                    .forEach(option => option.classList.remove('active'));
                btn.classList.add('active');
                parent.classList.add('selected');
                currentValueEl.innerText = btn.innerText;

                filterListSection.querySelectorAll('.filter-list-nav__title.active')
                    .forEach(el => el.classList.remove('active'));

                filterListSection.querySelectorAll('.filter-list-nav__item.selected')
                    .forEach(item => {
                        if (item === parent) return;
                        item.classList.remove('selected');
                        item.querySelectorAll('.filter-list-nav__list-option.active')
                            .forEach(el => el.classList.remove('active'));
                    })

                parent.classList.remove('list-opened');
                parent.parentElement.classList.remove('z-20');

            }

            if (radio.closest('.filter-list-nav__title')) {
                radio.closest('.filter-list-nav__title')?.classList.add('active');

                filterListSection.querySelectorAll('.filter-list-nav__item')
                    .forEach(item => {
                        item.classList.remove('list-opened', 'selected');
                        item.parentElement.classList.remove('z-20');
                        item.querySelectorAll('.filter-list-nav__list-option.active')
                            .forEach(el => el.classList.remove('active'));
                    })
            }
        })

        filterListSection.addEventListener('click', (e) => {
            if (e.target.closest('.filter-list-nav__title')) {
                const btn = e.target.closest('.filter-list-nav__title');
                const parent = btn.closest('.filter-list-nav__item');
                if (parent) {
                    if (parent.classList.contains('list-opened')) {
                        parent.classList.remove('list-opened')
                        parent.parentElement.classList.remove('z-20');
                    } else {
                        parent.classList.add('list-opened');
                        parent.parentElement.classList.add('z-20');
                    }
                }
                filterListSection.querySelectorAll('.filter-list-nav__item.list-opened')
                    .forEach(el => {
                        if (el === parent) return;
                        el.classList.remove('list-opened');
                        el.parentElement.classList.remove('z-20');
                    })
            }
        })

        const navigation = filterListSection.querySelector('[data-slider="filter-list-nav"]');
        if (navigation) {
            const slider = navigation;
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
        }

        // iso.insert(elements);
    })

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-list-nav__item')) {
            document.querySelectorAll('.filter-list-nav__item.list-opened')
                .forEach(el => {
                    el.classList.remove('list-opened');
                    el.parentElement.classList.remove('z-20');
                })
        }
    })
    window.iso = {
        append: (id, elements) => {

        },
    }
}
