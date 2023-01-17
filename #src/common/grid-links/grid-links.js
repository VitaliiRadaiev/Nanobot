{
    let gridLinks = document.querySelectorAll('[data-grid-links]');
    if(gridLinks.length) {
        gridLinks.forEach(list => {
            const getCoords = (el, container) => {
                let box = el.getBoundingClientRect();
                let wrapBox = container.getBoundingClientRect();
                return {
                    top: box.top - wrapBox.top + (el.clientHeight / 2),
                    left: box.left - wrapBox.left + (el.clientWidth / 2),
                    width: el.clientWidth + 40,
                    height: el.clientHeight,
                };
            }
            const setShadowPostion = (el, x, y, width, height) => {
                el.style.left = x + 'px';
                el.style.top = y + 'px';
                el.style.width = width + 'px';
                el.style.height = height + 'px';
            }

            let btn = document.querySelector(`[data-action="show-all-grid-links"][data-id="${list.dataset.id}"]`);

            //init
            if(document.documentElement.clientWidth >= 768) {
                let shadowEl = document.createElement('div');
                shadowEl.className = 'text-bg-shadow';
                

                let collapseDiv = document.createElement('div');
                collapseDiv.className = 'grid-links__collapse';
                collapseDiv.append(...Array.from(list.children).slice(3));
                list.append(collapseDiv);
                list.append(shadowEl);
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

                list.addEventListener('mousemove', (e) => {
                    let word = e.target.closest('a');
                    if (word) {
                        list.classList.add('_hover');
                        let {top, left, width, height} = getCoords(word, list);
                        setShadowPostion(shadowEl, left, top, width, height);
                    }
                })
    
                list.addEventListener('mouseleave', () => {
                    list.classList.remove('_hover');
                })
            }
        })
    }
}