{
    let postPreviewSections = document.querySelectorAll('[data-post-preview]');
    if(postPreviewSections.length) {
        postPreviewSections.forEach(postPreview => {
            let navItems = postPreview.querySelectorAll('.post-preview__tabs-nav-item');
            let contentItems = postPreview.querySelectorAll('.post-preview__content');
            let btnMore = postPreview.querySelector('.post-preview__col a.link');

            // init
            [navItems, contentItems].forEach(el => {
                if(el.length) {
                    el.forEach((item, index) => {
                        if(index > 2) {
                            item.classList.add('d-none');
                        }
                    })
                }
            })

            if(btnMore) {
                if(navItems.length <= 3) {
                    btnMore.classList.add('d-none');
                } else {
                    btnMore.addEventListener('click', (e) => {
                        e.preventDefault();
                        btnMore.classList.add('d-none');
                        [navItems, contentItems].forEach(el => {
                            if(el.length) {
                                el.forEach(item => {
                                    item.classList.remove('d-none');
                                })
                            }
                        })
                    })
                }
            }

        })
    }
}