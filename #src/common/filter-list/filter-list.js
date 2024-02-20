const filterListSections = document.querySelectorAll('[data-filter-list]');
if (filterListSections.length) {

    const instances = [];

    filterListSections.forEach(filterListSection => {
        filterListSection.closest('.bg-decor')?.classList.add('filter-list-wrap');
        const id = filterListSection.getAttribute('data-filter-list');
        if (!id) {
            throw new Error('data-filter-list="" must have any id');
        }
        const filterContainerOfItems = filterListSection.querySelector('[data-filter-body]');
        if (!filterContainerOfItems) return;

        const temporaryClass = 'filter-list-body-' + Date.now();
        filterContainerOfItems.classList.add(temporaryClass);

        const sizerEl = filterListSection.querySelector('.filter-list__item-sizer');
        const gutterEl = filterListSection.querySelector('.filter-list__item-gutter');
        if (!sizerEl && !gutterEl) return;

        const iso = new Isotope(filterContainerOfItems, {
            itemSelector: '.filter-list__item',
            percentPosition: true,
            masonry: {
                columnWidth: sizerEl,
                gutter: gutterEl
            }
        })

        instances.push({
            id,
            instance: iso
        })

        filterListSection.addEventListener('click', (e) => {
            if (e.target.closest('[data-filter-nav]')) {
                const btn = e.target.closest('[data-filter-nav]');
                const filterValue = btn.getAttribute('data-filter-nav');
                if (!filterValue) return;
                iso.arrange({
                    filter: `.${temporaryClass} ${filterValue}`
                })

                if (filterValue === '*') {
                    btn.classList.add('active');

                    filterListSection.querySelectorAll('.filter-list-nav__item')
                        .forEach(item => {
                            item.classList.remove('list-opened', 'selected');
                            item.parentElement.classList.remove('z-20');
                            item.querySelectorAll('.filter-list-nav__list-option.active')
                                .forEach(el => el.classList.remove('active'));
                        })
                }
            }

            if (e.target.closest('.filter-list-nav__title')) {
                const btn = e.target.closest('.filter-list-nav__title');
                const parent = btn.closest('.filter-list-nav__item');
                if (parent) {

                    if(parent.classList.contains('list-opened')) {
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

            if (e.target.closest('.filter-list-nav__list-option')) {
                const btn = e.target.closest('.filter-list-nav__list-option');
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

                if(document.documentElement.clientWidth < 768) {
                    parent.classList.remove('list-opened');
                    parent.parentElement.classList.remove('z-20');
                }
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
            const [isotopeData] = instances.filter(item => item.id === id);
            if (!isotopeData) return;
            isotopeData.instance.insert(elements);
        }
    }
}
