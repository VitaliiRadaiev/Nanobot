{
    let bannerSections = document.querySelectorAll('[data-banner]');
    if(bannerSections.length) {
        bannerSections.forEach(banner => {
            let imgWrap = banner.querySelector('.banner__img-wrap');
            let textWrap = banner.querySelector('.banner__text-wrap');
            let img = banner.querySelector('.banner__img');

            if(imgWrap && textWrap && img) {
                const moveImg = () => {
                    if(document.documentElement.clientWidth < 768) {
                        textWrap.prepend(img);
                    } else {
                        imgWrap.append(img);
                    }   
                }
                
                moveImg();

                window.addEventListener('resize', moveImg);
            }
        })
    }
}