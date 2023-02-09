{
    let bgDecorContainers = document.querySelectorAll('.bg-decor');
    if(bgDecorContainers.length) {
        bgDecorContainers.forEach(bgDecorContainer => {
            let bgInner = bgDecorContainer.querySelector('.bg-decor__inner');

            bgDecorContainer.after(bgInner);
            bgDecorContainer.removeAttribute('data-parallax');
            bgInner.setAttribute('data-parallax', '');

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
        })
    }

    function getCords(el) {
        let box = el.getBoundingClientRect();

        return box.top + window.pageYOffset;
    }
}