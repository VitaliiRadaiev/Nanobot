{
    let promoHeaderBtnScrollDown = document.querySelector('.hero__btn-scroll');
    if (promoHeaderBtnScrollDown) {
        promoHeaderBtnScrollDown.addEventListener('click', (e) => {
            e.preventDefault();

            window.scrollTo({
                top: document.documentElement.clientHeight,
                behavior: 'smooth',
            })
        })
    }

    let bg = document.querySelector('.hero__bg');
    if (bg) {
        if (bg.children.length) {
            bg.classList.add('hero__bg--shadow');
        }

        let video = bg.querySelector('video');
        if (video) {
            if(document.documentElement.clientWidth < 768) {
                let url = video.dataset.mediaMobile;
                if(url) {
                    Array.from(video.children).forEach(item => {
                        item.setAttribute('src', url);
                    })
                }
            }

            Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
                get: function () {
                    return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
                }
            });

            const playVideo = () => {
                video.play();

                if(!video.playing) {
                    setTimeout(() => {
                        playVideo()
                    }, 100)
                }
            }

            if(document.documentElement.clientWidth < 768) {
                window.addEventListener('load', () => {
                    playVideo();
                })
            } else {
                playVideo();
            }

        }
    }

    let title = document.querySelector('.hero__title-1');
    if (title) {
        const setFontSizeByScreenWidth = (title) => {
            let css = window.getComputedStyle(title, null);
            let defaultFontSize = parseFloat(css.getPropertyValue('font-size'));

            const setFontSeze = (fontSize) => {
                if (title.scrollWidth > title.clientWidth) {
                    title.style.fontSize = fontSize + 'px';
                    setFontSeze(fontSize - 1);
                } else {
                    title.style.fontSize = fontSize + 'px';
                }
            }
            setFontSeze(defaultFontSize);
        }

        if (document.documentElement.clientWidth < 768) {
            let id = setInterval(() => {
                setFontSizeByScreenWidth(title);
            }, 100);

            setTimeout(() => {
                clearInterval(id);
            }, 1000)

        } 

        window.addEventListener('resize', () => {
            if (document.documentElement.clientWidth < 768) {
                setFontSizeByScreenWidth(title);
            } 
        })
    }
}