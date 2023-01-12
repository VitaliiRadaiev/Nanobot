{
    let animationHoverTextContainers = document.querySelectorAll('[data-animation-hover-text]');
    if (animationHoverTextContainers.length) {
        animationHoverTextContainers.forEach(container => {
            const wrapWords = (el) => {
                el.innerHTML = el.innerHTML.replace(/\s?\w+[\s|,|\.]?/g, '<span class="word">$&</span>');
            }
            const getText = (container) => {
                if (container.children.length) {
                    Array.from(container.children).forEach(el => {
                        if (el.children.length) {
                            let result = Array.from(el.children).some(e => e.nodeName === 'A');
                            if (result) {
                                wrapWords(el);
                                return;
                            } else {
                                getText(el);
                            }
                        } else {
                            wrapWords(el);
                            return
                        }
                    })
                } else {
                    wrapWords(container);
                    return
                }
            }
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

            // init
            getText(container);

            // set Shadow
            let shadowEl = document.createElement('div');
            shadowEl.className = 'text-bg-shadow';
            container.append(shadowEl);

            container.addEventListener('mousemove', (e) => {
                let word = e.target.closest('.word');
                if (word) {
                    let {top, left, width, height} = getCoords(word, container);
                    setShadowPostion(shadowEl, left, top, width, height);
                }
            })
        })
    }
}