{
    let casesSections = document.querySelectorAll('[data-cases]');
    if(casesSections.length) {
        casesSections.forEach(cases => {
            let list = cases.querySelector('.cases-list');
            let btnLoadMore = cases.querySelector('.cases-load-more');

            if(list && btnLoadMore) {
                // init
                let listItems = Array.from(list.children);

                if(list.children.length > 2) {
                    listItems.forEach((item, index) => {
                        if(index > 1) {
                            item.classList.add('d-none')
                        }
                    })
                    btnLoadMore.classList.remove('d-none');
                }

                btnLoadMore.addEventListener('click', (e) => {
                    e.preventDefault();
                    let firstHideItem = list.querySelector('li.d-none');
                    if(firstHideItem) {
                        firstHideItem.classList.remove('d-none');

                        if(firstHideItem.nextElementSibling) {
                            firstHideItem.nextElementSibling.classList.remove('d-none');
                        } 
                        if(firstHideItem.nextElementSibling?.nextElementSibling) {
                            firstHideItem.nextElementSibling?.nextElementSibling.classList.remove('d-none');
                        } 
                        if(firstHideItem.nextElementSibling?.nextElementSibling?.nextElementSibling) {
                            firstHideItem.nextElementSibling?.nextElementSibling?.nextElementSibling.classList.remove('d-none');
                        } 
                    } 

                    if( !listItems.some(i => i.classList.contains('d-none')) ) {
                        btnLoadMore.classList.add('d-none');
                    }
                })
            }
        })
    }
}