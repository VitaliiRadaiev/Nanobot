{
    let gridLinks = document.querySelectorAll('[data-grid-links]');
    if(gridLinks.length) {
        gridLinks.forEach(list => {
            let btn = document.querySelector(`[data-action="show-all-grid-links"][data-id="${list.dataset.id}"]`);

            //init
            if(document.documentElement.clientWidth >= 768) {
                let collapseDiv = document.createElement('div');
                collapseDiv.className = 'grid-links__collapse';
                collapseDiv.append(...Array.from(list.children).slice(3));
                list.append(collapseDiv);

                Array.from(collapseDiv.children).forEach((el, index) => {
                    el.style.transitionDelay = index * 0.1 + 's';
                })

                if(btn) {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        btn.classList.add('hide');
                        //this.utils.slideDown(collapseDiv, 500, true);
                        collapseDiv.classList.add('open');
                        list.classList.add('grid-links--open');
                    })
                }
            }
        })
    }
}