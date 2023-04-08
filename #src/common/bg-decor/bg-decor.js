{
    let bgDecorContainers = document.querySelectorAll('.bg-decor');
    if (bgDecorContainers.length) {
        bgDecorContainers.forEach((bgDecorContainer, index) => {
            utils.scrollTrigger(bgDecorContainer, () => {
                let bgInner = bgDecorContainer.querySelector('.bg-decor__inner');

                bgDecorContainer.removeAttribute('data-parallax');
                bgInner.setAttribute('data-parallax', '');
    
                if (bgInner.children.length) {
                    bgDecorContainer.after(bgInner);
    
                    const setPositionAndSize = () => {
                        bgInner.style.top = getCords(bgDecorContainer) + 'px';
                        bgInner.style.height = bgDecorContainer.clientHeight + 'px';
                    }
    
                    let id = setInterval(() => {
                        setPositionAndSize();
                    }, 30);
    
                    setTimeout(() => {
                        clearInterval(id);
                    }, 1000)
    
                    window.addEventListener('resize', setPositionAndSize);

                    if('parallax' in bgInner.dataset) {
                        let parallaxContainer = bgInner;
                        if(parallaxContainer.children.length) {

                            if(!utils.isMobile()) {
                                new Parallax(parallaxContainer, {
                                    selector: '[data-depth]'
                                });
                            }

                            let elements = bgInner.querySelectorAll('.layer');
                            if (elements.length) {
                    
                                const translateY = (el, value, offset) => {
                                    el.style.transform = `translateY(${value / (offset ? offset : 10)}px)`;
                                }
                    
                                const rotate = (el, value) => {
                                    el.style.transform = `rotate(${(value * 0.02) - 10}deg)`;
                                }
                    
                                const scale = (el, value) => {
                                    el.style.transform = `scale(${(value * -0.002)})`;
                                }
                    
                                const parallaxHandler = (el, speedAttribute) => {
                                    let pageY = window.pageYOffset;
                                    let top = el.getBoundingClientRect().top + (el.clientHeight / 2);
                                    let value = (pageY + top) - (pageY + document.documentElement.clientHeight / 2);
                    
                    
                                    translateY(el, value, speedAttribute ? +speedAttribute : 8);
                    
                                }
                    
                                elements.forEach(el => {
                                    let speedAttribute = ('speed' in el.dataset) ? el.dataset.speed
                                        : el.querySelector('[data-speed]') ? el.querySelector('[data-speed]').dataset.speed
                                            : null;
                    
                                    if (el.closest('.vertical-parallax')) {
                                        el = el.closest('.vertical-parallax')
                                    }
                    
                                    let id = setInterval(() => {
                                        parallaxHandler(el, speedAttribute);
                                    }, 30);
                    
                                    setTimeout(() => {
                                        clearInterval(id);
                                    }, 1000)
                    
                                    window.addEventListener('scroll', () => parallaxHandler(el, speedAttribute));
                                })
                            }
                        }
                    }
                }
            }, index == 1 ? 1 : 1.5);

        })
    }

    function getCords(el) {
        let box = el.getBoundingClientRect();

        return box.top + window.pageYOffset;
    }
}