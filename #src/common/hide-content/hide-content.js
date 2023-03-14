{
    let hideContentElements = document.querySelectorAll('[data-hide-content]');
    if(hideContentElements.length) {
        hideContentElements.forEach(hideContentEl => {
            if(hideContentEl.children.length) {
                let btnTextCloseState = hideContentEl.dataset?.buttonText.split(',')[0];
                let btnTextOpenState = hideContentEl.dataset?.buttonText.split(',')[1];
                let btn = document.createElement('a');
                btn.setAttribute('href', '#');
                btn.className = 'link';
                btn.innerText = btnTextCloseState;

                hideContentEl.after(btn);

                btn.addEventListener('click', (e) => {
                    e.preventDefault();

                    if(hideContentEl.classList.contains('hide-content-is-open')) {
                        hideContentEl.classList.remove('hide-content-is-open')
                        this.utils.slideUp(hideContentEl);
                        btn.innerText = btnTextCloseState;
                        btn.classList.remove('hide-content-is-open');
                    } else {
                        hideContentEl.classList.add('hide-content-is-open')
                        this.utils.slideDown(hideContentEl);
                        btn.innerText = btnTextOpenState;
                        btn.classList.add('hide-content-is-open');
                    }
                })
            }
        })
    }
}