class Utils {
	slideUp(target, duration = 500) {
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	slideDown(target, duration = 500, flex = false) {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;
		if (display === 'none')
			display = flex ? 'flex' : 'block';

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	slideToggle(target, duration = 500) {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (window.getComputedStyle(target).display === 'none') {
				return this.slideDown(target, duration);
			} else {
				return this.slideUp(target, duration);
			}
		}
	}

	isSafari() {
		let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
		return isSafari;
	}

	Android() {
		return navigator.userAgent.match(/Android/i);
	}
	BlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	}
	iOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	}
	Opera() {
		return navigator.userAgent.match(/Opera Mini/i);
	}
	Windows() {
		return navigator.userAgent.match(/IEMobile/i);
	}
	isMobile() {
		return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
	}

	scrollTrigger(el, callback, offset = 1) {
		const trigger = () => {
			if ((el.getBoundingClientRect().top <= (window.innerHeight * offset)
				&& el.getBoundingClientRect().bottom >= (window.innerHeight * 0.5))
				&& !el.classList.contains('showed')
			) {
				if (typeof callback === 'function') {
					callback();
					el.classList.add('showed')
				}
			}
		}

		trigger();

		window.addEventListener('scroll', trigger);
	}

	numberCounterAnim() {
		let counterItems = document.querySelectorAll('[data-number-counter-anim]');
		if (counterItems) {

			counterItems.forEach(item => {
				let animation = anime({
					targets: item,
					textContent: [0, item.innerText],
					round: 1,
					easing: 'linear',
					autoplay: false,
					duration: 1000
				});

				window.addEventListener('load', () => {
					this.scrollTrigger(item, 15, () => { animation.play() })
				})
			})
		}
	}

	initTruncateString() {
		function truncateString(el, stringLength = 0) {
			let str = el.innerText;
			if (str.length <= stringLength) return;
			el.innerText = [...str].slice(0, stringLength).join('') + '...';
		}

		let truncateItems = document.querySelectorAll('[data-truncate-string]');
		if (truncateItems.length) {
			truncateItems.forEach(truncateItem => {
				truncateString(truncateItem, truncateItem.dataset.truncateString);
			})
		}
	}

	replaceToInlineSvg(query) {
		const images = document.querySelectorAll(query);

		if (images.length) {
			images.forEach(img => {
				let xhr = new XMLHttpRequest();
				xhr.open('GET', img.src);
				xhr.onload = () => {
					if (xhr.readyState === xhr.DONE) {
						if (xhr.status === 200) {
							let svg = xhr.responseXML.documentElement;
							svg.classList.add('_svg');
							img.parentNode.replaceChild(svg, img);
						}
					}
				}
				xhr.send(null);
			})
		}
	}

	setSameHeight() {
		let elements = document.querySelectorAll('[data-set-same-height]');
		if (elements.length) {
			const getGropus = (elements) => {
				let obj = {};

				elements.forEach(el => {
					let id = el.dataset.setSameHeight;
					if (obj.hasOwnProperty(id)) {
						obj[id].push(el);
					} else {
						obj[id] = [el];
					}
				})

				return obj;
			}
			const setMinHeight = (groups) => {
				for (let key in groups) {
					let maxHeight = Math.max(...groups[key].map(i => i.clientHeight));

					groups[key].forEach(el => {
						el.style.minHeight = maxHeight + 'px';
					})
				}
			}

			let groups = getGropus(elements);

			if (document.documentElement.clientWidth > 767.98) {
				setMinHeight(groups);
			}
		}
	}

	setFullHeaghtSize() {
		let elments = document.querySelectorAll('[data-full-min-height]');
		if (elments.length) {
			elments.forEach(el => {
				const setSize = () => {
					el.style.minHeight = document.documentElement.clientHeight + 'px';
				}

				setSize();

				window.addEventListener('resize', setSize);
			})
		}
	}
}


;

const utils = new Utils();

class App {
	init() {
		window.addEventListener('DOMContentLoaded', () => {
			document.body.classList.add('page-is-load');

			if (utils.isMobile()) {
				document.body.classList.add('mobile');
			}

			if (utils.iOS()) {
				document.body.classList.add('mobile-ios');
			}

			if (utils.isSafari()) {
				document.body.classList.add('safari');
			}

			utils.replaceToInlineSvg('.img-svg');
			this.setFontSize();
			this.headerHandler();
			//this.popupHandler(); +
			//this.initSmoothScroll(); +
			//this.inputMaskInit(); +
			//this.tabsInit(); +
			//this.selectInit(); +
			//this.spollerInit(); +
			this.componentsBeforeLoad();
			//this.slidersInit(); +
			//this.setWidthVariable(); +
			this.initScrollAnimationTrigger();
			this.footerParallaxInit();
		});


		window.addEventListener('load', () => {
			this.componentsAfterLoad();
			this.setAdaptiveFontSize();
		});

	}

	headerHandler() {
		let header = document.querySelector('[data-header]');
let menuToggleBtn = document.querySelector('[data-action="toggle-menu"]');
let menu = document.querySelector('[data-menu]')

if (header) {
    let isScroll = window.pageYOffset;

    window.addEventListener('scroll', () => {
        header.classList.toggle('header--is-scroll', window.pageYOffset > 50);

        if(window.pageYOffset > 200) {
            if(window.pageYOffset > isScroll) {
                header.classList.add('header--hide');
            } else if(window.pageYOffset < isScroll) {
                header.classList.remove('header--hide');
            }
        }

        isScroll = window.pageYOffset;
    })

}

if (menu) {
    let mobileMenuNavSubItems = menu.querySelectorAll('.menu-item-has-children');

    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', () => {
            menuToggleBtn.classList.toggle('menu-is-open');
            menu.classList.toggle('header-menu--open');
            header.classList.toggle('menu-is-open');

            if (document.documentElement.clientWidth < 992) {
                document.body.classList.toggle('overflow-hidden');
            }
        })
    }

    if(mobileMenuNavSubItems.length) {
        mobileMenuNavSubItems.forEach(item => {
            let link = item.querySelector('.menu__link');
            let subMenu = item.querySelector('.sub-menu');
    
            if (link && subMenu) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    item.classList.toggle('active');
                    link.classList.toggle('active');
                    utils.slideToggle(subMenu);
    
                    mobileMenuNavSubItems.forEach(i => {
                        if (i === item) return;
    
                        let link = i.querySelector('.menu__link');
                        let subMenu = i.querySelector('.sub-menu');
    
                        i.classList.remove('active');
                        link.classList.remove('active');
                        utils.slideUp(subMenu);
                    })
                })
            }
        })
    }

    document.addEventListener('click', (e) => {
        if(menu.classList.contains('header-menu--open')) {

            if(!e.target.closest('.header')) {
                if(!e.target.closest('.header-menu')) {
                    menuToggleBtn.classList.remove('menu-is-open');
                    menu.classList.remove('header-menu--open');
                    document.body.classList.remove('overflow-hidden');
                    header.classList.remove('menu-is-open');
                }
            }
        }
    })
}
	}

	// popupHandler() {
	// 	@ @include('../common/popup/popup.js')
	// }

	// slidersInit() {
	// 	@ @include('../common/awards/awards.js')
	// 	@ @include('../common/carousel/carousel.js')
	// 	@ @include('../common/testimonials-slider-card/testimonials-slider-card.js')
	// }


	// tabsInit() {
	// 	let tabsContainers = document.querySelectorAll('[data-tabs]');
	// 	if (tabsContainers.length) {
	// 		tabsContainers.forEach(tabsContainer => {
	// 			let triggerItems = tabsContainer.querySelectorAll('[data-tab-trigger]');
	// 			let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));

	// 			const getContentItem = (id) => {
	// 				if (!id.trim()) return;
	// 				return contentItems.filter(item => item.dataset.tabContent === id)[0];
	// 			}

	// 			if (triggerItems.length && contentItems.length) {
	// 				// init
	// 				let activeItem = tabsContainer.querySelector('.tab-active[data-tab-trigger]');
	// 				if (activeItem) {
	// 					activeItem.classList.add('tab-active');
	// 					getContentItem(activeItem.dataset.tabTrigger).classList.add('tab-active');
	// 				} else {
	// 					triggerItems[0].classList.add('tab-active');
	// 					getContentItem(triggerItems[0].dataset.tabTrigger).classList.add('tab-active');
	// 				}
	// 			}

	// 			tabsContainer.addEventListener('click', (e) => {
	// 				if (e.target.closest('[data-tab-trigger]')) {
	// 					e.preventDefault();
	// 					let triggerItems = tabsContainer.querySelectorAll('[data-tab-trigger]');
	// 					let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));
	// 					let item = e.target.closest('[data-tab-trigger]');

	// 					const getContentItem = (id) => {
	// 						if (!id.trim()) return;
	// 						return contentItems.filter(item => item.dataset.tabContent === id)[0];
	// 					}

	// 					item.classList.add('tab-active');
	// 					getContentItem(item.dataset.tabTrigger).classList.add('tab-active');

	// 					triggerItems.forEach(i => {
	// 						if (i === item) return;

	// 						i.classList.remove('tab-active');
	// 						getContentItem(i.dataset.tabTrigger).classList.remove('tab-active');
	// 					})

	// 					if (this.postPreviewCardsUpdate) this.postPreviewCardsUpdate();
	// 				}
	// 			})

	// 		})
	// 	}
	// }

	// spollerInit() {
	// 	let spollers = document.querySelectorAll('[data-spoller]');
	// 	if (spollers.length) {
	// 		spollers.forEach(spoller => {
	// 			let isOneActiveItem = spoller.dataset.spoller.trim() === 'one' ? true : false;
	// 			let triggers = spoller.querySelectorAll('[data-spoller-trigger]');
	// 			if (triggers.length) {
	// 				triggers.forEach(trigger => {
	// 					let parent = trigger.parentElement;
	// 					let content = trigger.nextElementSibling;

	// 					// init
	// 					if (trigger.classList.contains('active')) {
	// 						content.style.display = 'block';
	// 						parent.classList.add('active');
	// 					}

	// 					trigger.addEventListener('click', (e) => {
	// 						e.preventDefault();
	// 						parent.classList.toggle('active');
	// 						trigger.classList.toggle('active');
	// 						content && utils.slideToggle(content);

	// 						if (isOneActiveItem) {
	// 							triggers.forEach(i => {
	// 								if (i === trigger) return;

	// 								let parent = i.parentElement;
	// 								let content = i.nextElementSibling;

	// 								parent.classList.remove('active');
	// 								i.classList.remove('active');
	// 								content && utils.slideUp(content);
	// 							})
	// 						}
	// 					})
	// 				})
	// 			}
	// 		})
	// 	}
	// }

	// inputMaskInit() {
	// 	let items = document.querySelectorAll('[data-mask]');
	// 	if (items.length) {
	// 		items.forEach(item => {
	// 			let maskValue = item.dataset.mask;
	// 			let input = item.querySelector('input[type="text"]');

	// 			if (input) {
	// 				Inputmask(maskValue, {
	// 					//"placeholder": '',
	// 					clearIncomplete: true,
	// 					clearMaskOnLostFocus: true,
	// 					showMaskOnHover: false,
	// 				}).mask(input);
	// 			}
	// 		})
	// 	}
	// }


	// initSmoothScroll() {
	// 	let anchors = document.querySelectorAll('a[href*="#"]:not([data-popup="open-popup"])');
	// 	if (anchors.length) {

	// 		anchors.forEach(anchor => {
	// 			if (!anchor.getAttribute('href').match(/#\w+$/gi)) return;

	// 			let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');

	// 			anchor.addEventListener('click', (e) => {
	// 				let el = document.querySelector(`#${id}`);

	// 				if (el) {
	// 					e.preventDefault();
	// 					let top = Math.abs(document.body.getBoundingClientRect().top) + el.getBoundingClientRect().top;

	// 					window.scrollTo({
	// 						top: top,
	// 						behavior: 'smooth',
	// 					})
	// 				}
	// 			})

	// 		})
	// 	}

	// }

	// selectInit() {
	// 	@ @include('../common/select/select.js');
	// }

	setFontSize() {
		const setFontSize = () => {
			let value = 10 / 1920 * document.documentElement.clientWidth;
			document.documentElement.style.fontSize = value + 'px';
		}

		setFontSize();



		window.addEventListener('resize', setFontSize);
	}

	// setWidthVariable() {
	// 	const wrapWords = (el) => {
	// 		el.innerHTML = el.innerText.replace(/\s?[\w|-|'|’]+[\s|,|\.|\?|\!]?/g, '<span class="word">$&</span>');

	// 		if (el.children.length) {
	// 			if (el.children[0].innerText.trim().length <= 2) {
	// 				el.children[0].innerText = el.children[0].innerText + ' ' + el.children[1].innerText;
	// 				el.children[1].remove();
	// 			}
	// 		}
	// 	}
	// 	const getBottomWords = (el) => {
	// 		let elCoord = el.getBoundingClientRect();
	// 		let arr = [];
	// 		Array.from(el.children).forEach(word => {
	// 			let wordCoord = word.getBoundingClientRect();
	// 			if ((elCoord.bottom - wordCoord.bottom) < 1) {
	// 				arr.push(word);
	// 			}
	// 		});
	// 		return arr;
	// 	}

	// 	const setVar = (el, words) => {
	// 		let width = words.reduce((value, item) => {
	// 			return value + item.clientWidth;
	// 		}, 0)
	// 		el.setAttribute('style', `--width: ${width}px`);
	// 	}

	// 	let elements = document.querySelectorAll('[data-set-width-variable]');
	// 	if (elements.length) {
	// 		let postPreviewCardsHandlers = [];

	// 		elements.forEach(el => {

	// 			let link = el.querySelector('a');
	// 			if (link) {
	// 				let text = wrapWordsInSpan(link.innerText);
	// 				link.innerHTML = text;

	// 				const handler = () => {
	// 					let bottomWords = getBottomWords(link);
	// 					Array.from(link.children).forEach(word => word.classList.remove('with-line'));
	// 					bottomWords[0].classList.add('with-line');
	// 					setVar(el, bottomWords);
	// 				}

	// 				handler();

	// 				let id = setInterval(() => {
	// 					handler();
	// 				}, 100);

	// 				setTimeout(() => {
	// 					clearInterval(id);
	// 				}, 1000)

	// 				window.addEventListener('resize', () => {
	// 					let id = setInterval(() => {
	// 						handler();
	// 					}, 100);

	// 					setTimeout(() => {
	// 						clearInterval(id);
	// 					}, 500)
	// 				})
	// 			} else if (el.classList.contains('post-preview-card__title')) {
	// 				let text = wrapWordsInSpan(el.innerHTML);
	// 				el.innerHTML = text;

	// 				const handler = () => {
	// 					let bottomWords = getBottomWords(el);
	// 					Array.from(el.children).forEach(word => word.classList.remove('with-line'));
	// 					bottomWords[0].classList.add('with-line');
	// 					setVar(el, bottomWords);
	// 				}

	// 				handler();
	// 				postPreviewCardsHandlers.push(handler);

	// 				let id = setInterval(() => {
	// 					handler();
	// 				}, 100);

	// 				setTimeout(() => {
	// 					clearInterval(id);
	// 				}, 1000)

	// 				window.addEventListener('resize', () => {
	// 					let id = setInterval(() => {
	// 						handler();
	// 					}, 100);

	// 					setTimeout(() => {
	// 						clearInterval(id);
	// 					}, 500)
	// 				})
	// 			}
	// 		})

	// 		this.postPreviewCardsUpdate = () => {
	// 			if (postPreviewCardsHandlers.length) {
	// 				postPreviewCardsHandlers.forEach(f => f());
	// 			}
	// 		}
	// 	}

	// 	function wrapWordsInSpan(text) {
	// 		const words = text.split(/(<.*?>|\s+)/);
	
	// 		const wordsInSpans = words.map(word => {
	// 			if (word.match(/<.*?>/)) {
	// 				return word;
	// 			} else if (word.trim() !== '') {
	// 				return `<span class="word">${word}</span>`;
	// 			} else {
	// 				return word;
	// 			}
	// 		});
	
	// 		const wrappedText = wordsInSpans.join('');
	
	// 		return wrappedText;
	// 	}
	// }

	initScrollAnimationTrigger() {
		const setScrollTrigger = (el, offset, callback = null) => {
			let triggerPoint = document.documentElement.clientHeight / 100 * (100 - offset);
			const trigger = () => {
				if (el.getBoundingClientRect().top <= triggerPoint && !el.classList.contains('show-animation')) {
					if (typeof callback === 'function') {
						callback();
					}
					el.classList.add('show-animation')
				}
			}

			trigger();

			window.addEventListener('scroll', trigger);
		}

		let elements = document.querySelectorAll('[data-scroll-animation-trigger]');
		if (elements.length) {
			elements.forEach(el => {
				setScrollTrigger(el, 15);
			})
		}
	}

	footerParallaxInit() {
		let footer = document.querySelector('.footer');
			if(footer) {
				utils.scrollTrigger(footer, () => {
					if(!utils.isMobile()) {
						new Parallax(footer, {
							selector: '[data-depth]'
						});
					}
	
					let elements = footer.querySelectorAll('.layer');
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
				}, 1.5)

			}
	}

	setAdaptiveFontSize() {

		const handler = () => {
			let elements = document.querySelectorAll('[data-adaptive-font-size]');
			if (elements.length) {

				elements.forEach(el => {
					if (el.classList.contains('has-handler')) return;

					let link = el.querySelector('a');

					const setFontSizeByScreenWidth = (title) => {
						let css = window.getComputedStyle(title, null);
						let defaultFontSize = Math.round(parseFloat(css.getPropertyValue('font-size')));

						if (link) {
							title.innerHTML = link.innerText;
						}

						const setFontSeze = (fontSize) => {
							if (title.scrollWidth > title.clientWidth) {
								title.style.fontSize = fontSize + 'px';
								setFontSeze(fontSize - 1);
							} else {
								title.style.fontSize = fontSize + 'px';
							}
						}
						setFontSeze(defaultFontSize);

						if (link) {
							title.innerText = '';
							title.append(link);
						}
					}

					setFontSizeByScreenWidth(el);

					window.addEventListener('resize', () => {
						setFontSizeByScreenWidth(el);
					})

					el.classList.add('has-handler');
				})
			}

		}
		handler();

		window.adaptiveFontSizeHandler = handler;

	}

	componentsBeforeLoad() {
		// @ @include('../common/grid-links/grid-links.js')
		// @ @include('../common/rating/rating.js')
		// @ @include('../common/team-list/team-list.js')
		// @ @include('../common/banner/banner.js')
		// @ @include('../common/animation-hover-text/animation-hover-text.js')
		// @ @include('../common/post-preview/post-preview.js')
		{
    let promoHeaderBtnScrollDown = document.querySelector('.promo-header__btn-scroll');
    if(promoHeaderBtnScrollDown) {
        promoHeaderBtnScrollDown.addEventListener('click', (e) => {
            e.preventDefault();

            window.scrollTo({
                top: document.documentElement.clientHeight,
                behavior: 'smooth',
            })
        })
    }

    let bg = document.querySelector('.promo-header__bg');
    if(bg) {
        if(bg.children.length) {
            bg.classList.add('promo-header__bg--shadow');
        }
    }
}
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
		{
    let bgDecorContainers = document.querySelectorAll('.bg-decor');
    if (bgDecorContainers.length) {
        window.bgDecors = [];
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

                    window.bgDecors.push(() => {
                        setPositionAndSize();
                        let id = setInterval(() => {
                            setPositionAndSize();
                        }, 20);
        
                        setTimeout(() => {
                            clearInterval(id);
                        }, 200)
                    });

                    setPositionAndSize();
    
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
            }, index == 1 ? 0.9 : 1.5);

        })
    }

    function getCords(el) {
        let box = el.getBoundingClientRect();

        return box.top + window.pageYOffset;
    }
}
		// @ @include('../common/cases/cases.js')
		// @ @include('../common/hide-content/hide-content.js')
		// @ @include('../common/posts-list/posts-list.js')
		// @ @include('../common/sticky-box/sticky-box.js')
	}

	componentsAfterLoad() {

	}

}

let app = new App();
app.init();


