{
    let stickyBoxes = document.querySelectorAll('[data-sticky-box]');
    if(stickyBoxes.length) {
        let header = document.querySelector('[data-header]');
        stickyBoxes.forEach(stickyBox => {
            let parentContainer = stickyBox.parentElement;

            window.addEventListener('scroll', () => {
                if(document.documentElement.clientWidth >= 992) {
                    let {top, left} = parentContainer.getBoundingClientRect();
                    let maxValue = parentContainer.clientHeight - stickyBox.clientHeight;
    
                    if(top < header.clientHeight) {
                        if( (Math.abs(top) + header.clientHeight) > maxValue) {
                            parentContainer.style.display = 'flex';
                            parentContainer.style.alignItems = 'flex-end';
                            stickyBox.style.position = 'static';
                        } else {
                            parentContainer.removeAttribute('style');
                            stickyBox.style.position = 'fixed';
                        }
                        stickyBox.style.top = header.clientHeight + 2 + 'px';
                        stickyBox.style.left = left + 'px';
                        stickyBox.style.width = parentContainer.clientWidth + 'px';
                    } else {
                        stickyBox.removeAttribute('style');
                    }
                } else {
                    parentContainer.removeAttribute('style');
                    stickyBox.removeAttribute('style');
                }
            })

            window.addEventListener('resize', () => {
                if(document.documentElement.clientWidth >= 992) {
                    let {left} = parentContainer.getBoundingClientRect();
                    stickyBox.style.top = header.clientHeight + 2 + 'px';
                    stickyBox.style.left = left + 'px';
                    stickyBox.style.width = parentContainer.clientWidth + 'px';
                } else {
                    parentContainer.removeAttribute('style');
                    stickyBox.removeAttribute('style');
                }
            })
        })
        
    }
}