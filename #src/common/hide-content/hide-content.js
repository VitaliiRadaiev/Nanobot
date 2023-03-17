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
                        //hideContentEl.style.height = hideContentEl.scrollHeight + 'px';
                        hideContentEl.style.height = '33rem';
                        setTimeout(() => {
                            hideContentEl.removeAttribute('style');
                        },500)
                        btn.innerText = btnTextCloseState;
                        btn.classList.remove('hide-content-is-open');
                    } else {
                        hideContentEl.classList.add('hide-content-is-open')
                        console.log(hideContentEl.scrollHeight);
                        hideContentEl.style.height = hideContentEl.scrollHeight + 'px';
                        // setTimeout(() => {
                        //     hideContentEl.style.height = 'auto';
                        // },500)
                        btn.innerText = btnTextOpenState;
                        btn.classList.add('hide-content-is-open');
                    }
                })
            }
        })
    }
}