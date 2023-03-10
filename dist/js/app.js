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

	scrollTrigger(el, value, callback) {
		let triggerPoint = document.documentElement.clientHeight / 100 * (100 - value);
		const trigger = () => {
			if(el.getBoundingClientRect().top <= triggerPoint && !el.classList.contains('is-show')) {
				if(typeof callback === 'function') {
					callback();
					el.classList.add('is-show')
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
					this.scrollTrigger(item, 15, () => {animation.play()})
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
		if(truncateItems.length) {
			truncateItems.forEach(truncateItem => {
				truncateString(truncateItem, truncateItem.dataset.truncateString);
			})
		}
	}

	replaceToInlineSvg(query) {
		const images = document.querySelectorAll(query);

		if(images.length) {
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
		if(elements.length) {
			const getGropus = (elements) => {
				let obj = {};

				elements.forEach(el => {
					let id = el.dataset.setSameHeight;
					if(obj.hasOwnProperty(id)) {
						obj[id].push(el);
					} else {
						obj[id] = [el];
					}
				})

				return obj;
			}
			const setMinHeight = (groups) => {
				for(let key in groups) {
					let maxHeight = Math.max(...groups[key].map(i => i.clientHeight));
					
					groups[key].forEach(el => {
						el.style.minHeight = maxHeight + 'px';
					})
				}
			}

			let groups = getGropus(elements);

			if(document.documentElement.clientWidth > 767.98) {
				setMinHeight(groups);
			}
		}
	}

	setFullHeaghtSize() {
		let elments = document.querySelectorAll('[data-full-min-height]');
		if(elments.length) {
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



// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".content__column-garden,992,2"
// https://github.com/FreelancerLifeStyle/dynamic_adapt

class DynamicAdapt {
	constructor(type) {
	  this.type = type;
	}
  
	init() {
	  this.??bjects = [];
	  this.daClassname = '_dynamic_adapt_';
	  this.nodes = [...document.querySelectorAll('[data-da]')];
  
	  this.nodes.forEach((node) => {
		const data = node.dataset.da.trim();
		const dataArray = data.split(',');
		const ??bject = {};
		??bject.element = node;
		??bject.parent = node.parentNode;
		??bject.destination = document.querySelector(`${dataArray[0].trim()}`);
		??bject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
		??bject.place = dataArray[2] ? dataArray[2].trim() : 'last';
		??bject.index = this.indexInParent(??bject.parent, ??bject.element);
		this.??bjects.push(??bject);
	  });
  
	  this.arraySort(this.??bjects);
  
	  this.mediaQueries = this.??bjects
		.map(({
		  breakpoint
		}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
		.filter((item, index, self) => self.indexOf(item) === index);
  
	  this.mediaQueries.forEach((media) => {
		const mediaSplit = media.split(',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];
  
		const ??bjectsFilter = this.??bjects.filter(
		  ({
			breakpoint
		  }) => breakpoint === mediaBreakpoint
		);
		matchMedia.addEventListener('change', () => {
		  this.mediaHandler(matchMedia, ??bjectsFilter);
		});
		this.mediaHandler(matchMedia, ??bjectsFilter);
	  });
	}
  
	mediaHandler(matchMedia, ??bjects) {
	  if (matchMedia.matches) {
		??bjects.forEach((??bject) => {
		  ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
		  this.moveTo(??bject.place, ??bject.element, ??bject.destination);
		});
	  } else {
		??bjects.forEach(
		  ({ parent, element, index }) => {
			if (element.classList.contains(this.daClassname)) {
			  this.moveBack(parent, element, index);
			}
		  }
		);
	  }
	}
  
	moveTo(place, element, destination) {
	  element.classList.add(this.daClassname);
	  if (place === 'last' || place >= destination.children.length) {
		destination.append(element);
		return;
	  }
	  if (place === 'first') {
		destination.prepend(element);
		return;
	  }
	  destination.children[place].before(element);
	}
  
	moveBack(parent, element, index) {
	  element.classList.remove(this.daClassname);
	  if (parent.children[index] !== undefined) {
		parent.children[index].before(element);
	  } else {
		parent.append(element);
	  }
	}
  
	indexInParent(parent, element) {
	  return [...parent.children].indexOf(element);
	}
  
	arraySort(arr) {
	  if (this.type === 'min') {
		arr.sort((a, b) => {
		  if (a.breakpoint === b.breakpoint) {
			if (a.place === b.place) {
			  return 0;
			}
			if (a.place === 'first' || b.place === 'last') {
			  return -1;
			}
			if (a.place === 'last' || b.place === 'first') {
			  return 1;
			}
			return a.place - b.place;
		  }
		  return a.breakpoint - b.breakpoint;
		});
	  } else {
		arr.sort((a, b) => {
		  if (a.breakpoint === b.breakpoint) {
			if (a.place === b.place) {
			  return 0;
			}
			if (a.place === 'first' || b.place === 'last') {
			  return 1;
			}
			if (a.place === 'last' || b.place === 'first') {
			  return -1;
			}
			return b.place - a.place;
		  }
		  return b.breakpoint - a.breakpoint;
		});
		return;
	  }
	}
}


class App {
	constructor() {
		this.utils = new Utils();
		this.dynamicAdapt = new DynamicAdapt('max');
	}

	init() {
		window.addEventListener('DOMContentLoaded', () => {
			document.body.classList.add('page-is-load');

			if (this.utils.isMobile()) {
				document.body.classList.add('mobile');
			}

			if (this.utils.iOS()) {
				document.body.classList.add('mobile-ios');
			}

			if (this.utils.isSafari()) {
				document.body.classList.add('safari');
			}

			this.utils.replaceToInlineSvg('.img-svg');
			this.setFontSize();
			this.dynamicAdapt.init();
			this.headerHandler();
			this.popupHandler();
			this.initSmoothScroll();
			this.inputMaskInit();
			this.tabsInit();
			this.selectInit();
			this.spollerInit();
			this.componentsBeforeLoad();
			this.slidersInit();
			this.setWidthVariable();
			this.initScrollAnimationTrigger();
			this.parallaxInit();

		});



		window.addEventListener('load', () => {
			//this.setPaddingTopHeaderSize();
			this.componentsAfterLoad();

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
                    this.utils.slideToggle(subMenu);
    
                    mobileMenuNavSubItems.forEach(i => {
                        if (i === item) return;
    
                        let link = i.querySelector('.menu__link');
                        let subMenu = i.querySelector('.sub-menu');
    
                        i.classList.remove('active');
                        link.classList.remove('active');
                        this.utils.slideUp(subMenu);
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

	popupHandler() {
		// ==== Popup form handler====

const popupLinks = document.querySelectorAll('[data-popup="open-popup"]');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('[data-popup="lock-padding"]');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('[data-popup="close-popup"]');
if(popupCloseIcon.length > 0) {
	for(let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if(curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.popup--open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('popup--open');
		curentPopup.addEventListener('click', function(e) {
			if(!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup')); 
			}
		});

	}
}

function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		popupActive.classList.remove('popup--open');
		if(doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');
	if(targetPadding.length) {
		for (let index = 0; index < targetPadding.length; index++) {
			const el = targetPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	if(lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('overflow-hidden');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');

	setTimeout(function() {
		if(targetPadding.length) {
			for (let index = 0; index < targetPadding.length; index++) {
				const el = targetPadding[index];
				el.style.paddingRight = '0px';
			}
		}

		for( let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}

		body.style.paddingRight = '0px';
		body.classList.remove('overflow-hidden');
	}, timeout);

	unlock = false;
	setTimeout(function() { 
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if(e.which === 27) {
		const popupActive = document.querySelector('.popup.popup--open');
		popupClose(popupActive);
	}
});

// === Polyfill ===
	(function() {
		if(!Element.prototype.closest) {
			Element.prototype.closest = function(css) {
				var node = this;
				while(node) {
					if(node.matches(css)) return node;
					else node == node.parentElement;
				}
				return null;
			};
		}
	})();

	(function() {
		if(!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.mozMatchesSelector;
		}
	})();
// === AND Polyfill ===

// ???????????????????? API ???????????? ?? ?????????????????? ??????????????????
window.popup = {
	open(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupOpen(popup);
	},
	close(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupClose(popup);
	}
}

	}

	slidersInit() {
		{
    let awards = document.querySelector('[data-slider="awards"]');
    if(awards) {
        let shadowBtnRight = awards.querySelector('.awards__shadow-right');
        let sliderData = new Swiper(awards.querySelector('.swiper'), {
            speed: 600,
            breakpoints: {
                320: {
                    slidesPerView: 'auto',
                    spaceBetween: 50,
                    centeredSlides: true,
                },
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 95,
                    centeredSlides: false,
                }
            }
        });

        if(shadowBtnRight) {
            shadowBtnRight.addEventListener('mousemove', () => {
                awards.classList.add('awards--init')
            })
        }
    }
}
		{
    let carousels = document.querySelectorAll('[data-slider="carousel"]');
    if(carousels.length) {
        carousels.forEach(carousel => {
            let sliderData = new Swiper(carousel.querySelector('.swiper'), {
                speed: 600,
                breakpoints: {
                    320: {
                        slidesPerView: 'auto',
                        spaceBetween: 80,
                        centeredSlides: true,
                    },
                    768: {
                        slidesPerView: 'auto',
                        spaceBetween: 95,
                        centeredSlides: false,
                    }
                }
            });
        })
    }
}
{
    let carousels = document.querySelectorAll('[data-slider="carousel-second"]');
    if(carousels.length) {
        carousels.forEach(carousel => {
            let btnLeft = carousel.querySelector('.carousel__shadow-left');
            let btnRight = carousel.querySelector('.carousel__shadow-right');

            let sliderData = new Swiper(carousel.querySelector('.swiper'), {
                speed: 600,
                breakpoints: {
                    320: {
                        slidesPerView: 'auto',
                        spaceBetween: 30,
                        centeredSlides: true,
                        autoHeight: true,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                        centeredSlides: false,
                        autoHeight: false,
                    },
                    992: {
                        slidesPerView: 2,
                        spaceBetween: 85,
                        centeredSlides: false,
                        autoHeight: false,
                    }
                },
                // navigation: {
                //     nextEl: carousel.querySelector('.carousel__shadow-right'),
                //     prevEl: carousel.querySelector('.carousel__shadow-left'),
                // },
            });
            
            function setButtonsVisibility(sliderData) {
                if(sliderData.isBeginning) {
                    btnLeft.classList.add('hide');
                } else {
                    btnLeft.classList.remove('hide');
                }
                if(sliderData.isEnd) {
                    btnRight.classList.add('hide');
                } else {
                    btnRight.classList.remove('hide');
                }
            }

            setButtonsVisibility(sliderData);

            sliderData.on('slideChange', () => {
                setButtonsVisibility(sliderData);
            })


            let idBtnRight = null;
            btnRight.addEventListener('mouseenter', () => {
                sliderData.slideNext();
                idBtnRight = setInterval(() => {
                    sliderData.slideNext();
                },1000)
            })
            btnRight.addEventListener('mouseleave', () => {
                clearInterval(idBtnRight);
            })

            let idBtnLeft = null;
            btnLeft.addEventListener('mouseenter', () => {
                sliderData.slidePrev();
                idBtnLeft = setInterval(() => {
                    sliderData.slidePrev();
                },1000)
            })
            btnLeft.addEventListener('mouseleave', () => {
                clearInterval(idBtnLeft);
            })
        })
    }
}
		{
    let testimonialsSliderCards = document.querySelectorAll('[data-slider="testimonials-slider-card"]');
    if(testimonialsSliderCards.length) {
        testimonialsSliderCards.forEach(slider => {
            let logos = slider.closest('.testimonials-slider-card').querySelector('.testimonials-slider-card__logo');
            let sliderDataText = new Swiper(slider.querySelector('.swiper'), {
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 20,
                autoHeight: true,
                speed: 600,
                loop: true,
                navigation: {
                    prevEl: slider.querySelector('.testimonials-slider-card__btn.prev'),
                    nextEl: slider.querySelector('.testimonials-slider-card__btn.next'),
                },
            });

            let sliderDataLogos = new Swiper(logos.querySelector('.swiper'), {
                observer: true,
                observeParents: true,
                effect: 'fade',
                slidesPerView: 1,
                spaceBetween: 20,
                autoHeight: true,
                speed: 600,
                loop: true,
            });

            sliderDataText.controller.control = sliderDataLogos;
        })
    }
}
	}


	tabsInit() {
		let tabsContainers = document.querySelectorAll('[data-tabs]');
		if (tabsContainers.length) {
			tabsContainers.forEach(tabsContainer => {
				let triggerItems = tabsContainer.querySelectorAll('[data-tab-trigger]');
				let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));

				const getContentItem = (id) => {
					if (!id.trim()) return;
					return contentItems.filter(item => item.dataset.tabContent === id)[0];
				}

				if (triggerItems.length && contentItems.length) {
					// init
					let activeItem = tabsContainer.querySelector('.tab-active[data-tab-trigger]');
					if (activeItem) {
						activeItem.classList.add('tab-active');
						getContentItem(activeItem.dataset.tabTrigger).classList.add('tab-active');
					} else {
						triggerItems[0].classList.add('tab-active');
						getContentItem(triggerItems[0].dataset.tabTrigger).classList.add('tab-active');
					}
				}

				tabsContainer.addEventListener('click', (e) => {
					if (e.target.closest('[data-tab-trigger]')) {
						e.preventDefault();
						let triggerItems = tabsContainer.querySelectorAll('[data-tab-trigger]');
						let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));
						let item = e.target.closest('[data-tab-trigger]');

						const getContentItem = (id) => {
							if (!id.trim()) return;
							return contentItems.filter(item => item.dataset.tabContent === id)[0];
						}

						item.classList.add('tab-active');
						getContentItem(item.dataset.tabTrigger).classList.add('tab-active');

						triggerItems.forEach(i => {
							if (i === item) return;

							i.classList.remove('tab-active');
							getContentItem(i.dataset.tabTrigger).classList.remove('tab-active');
						})

						if(this.postPreviewCardsUpdate) this.postPreviewCardsUpdate();
					}
				})

			})
		}
	}

	spollerInit() {
		let spollers = document.querySelectorAll('[data-spoller]');
		if (spollers.length) {
			spollers.forEach(spoller => {
				let isOneActiveItem = spoller.dataset.spoller.trim() === 'one' ? true : false;
				let triggers = spoller.querySelectorAll('[data-spoller-trigger]');
				if (triggers.length) {
					triggers.forEach(trigger => {
						let parent = trigger.parentElement;
						let content = trigger.nextElementSibling;

						// init
						if (trigger.classList.contains('active')) {
							content.style.display = 'block';
							parent.classList.add('active');
						}

						trigger.addEventListener('click', (e) => {
							e.preventDefault();
							parent.classList.toggle('active');
							trigger.classList.toggle('active');
							content && this.utils.slideToggle(content);

							if (isOneActiveItem) {
								triggers.forEach(i => {
									if (i === trigger) return;

									let parent = i.parentElement;
									let content = i.nextElementSibling;

									parent.classList.remove('active');
									i.classList.remove('active');
									content && this.utils.slideUp(content);
								})
							}
						})
					})
				}
			})
		}
	}

	inputMaskInit() {
		let items = document.querySelectorAll('[data-mask]');
		if (items.length) {
			items.forEach(item => {
				let maskValue = item.dataset.mask;
				let input = item.querySelector('input[type="text"]');

				if (input) {
					Inputmask(maskValue, {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						showMaskOnHover: false,
					}).mask(input);
				}
			})
		}
	}

	setPaddingTopHeaderSize() {
		let wrapper = document.querySelector('[data-padding-top-header-size]');
		if (wrapper) {
			let header = document.querySelector('[data-header]');
			if (header) {
				const setPedding = () => wrapper.style.paddingTop = header.clientHeight + 'px';
				setPedding();
				let id = setInterval(setPedding, 200);
				setTimeout(() => {
					clearInterval(id);
				}, 2000)
				window.addEventListener('resize', setPedding);
			}

		}
	}

	initSmoothScroll() {
		let anchors = document.querySelectorAll('a[href*="#"]:not([data-popup="open-popup"])');
		if (anchors.length) {

			anchors.forEach(anchor => {
				if (!anchor.getAttribute('href').match(/#\w+$/gi)) return;

				let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');

				anchor.addEventListener('click', (e) => {
					let el = document.querySelector(`#${id}`);

					if (el) {
						e.preventDefault();
						let top = Math.abs(document.body.getBoundingClientRect().top) + el.getBoundingClientRect().top;

						window.scrollTo({
							top: top,
							behavior: 'smooth',
						})
					}
				})

			})
		}

	}

	selectInit() {
		{
    function _slideUp(target, duration = 500) {
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
    function _slideDown(target, duration = 500) {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none')
            display = 'block';
    
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
    function _slideToggle(target, duration = 500) {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            if (window.getComputedStyle(target).display === 'none') {
                return _slideDown(target, duration);
            } else {
                return _slideUp(target, duration);
            }
        }
    }

    //Select
    let selects = document.getElementsByTagName('select');
    if (selects.length > 0) {
        selects_init();
    }
    function selects_init() {
        for (let index = 0; index < selects.length; index++) {
            const select = selects[index];
            select_init(select);
        }
        //select_callback();
        document.addEventListener('click', function (e) {
            selects_close(e);
        });
        document.addEventListener('keydown', function (e) {
            if (e.which == 27) {
                selects_close(e);
            }
        });
    }
    function selects_close(e) {
        const selects = document.querySelectorAll('.select');
        if (!e.target.closest('.select')) {
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                const select_body_options = select.querySelector('.select__options');
                select.classList.remove('_active');
                _slideUp(select_body_options, 100);
            }
        }
    }
    function select_init(select) {
        const select_parent = select.parentElement;
        const select_modifikator = select.getAttribute('class');
        const select_selected_option = select.querySelector('option:checked');
        select.setAttribute('data-default', select_selected_option.value);
        select.style.display = 'none';

        select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

        let new_select = select.parentElement.querySelector('.select');
        new_select.appendChild(select);
        select_item(select);
    }
    function select_item(select) {
        const select_parent = select.parentElement;
        const select_items = select_parent.querySelector('.select__item');
        const select_options = select.querySelectorAll('option');
        const select_selected_option = select.querySelector('option:checked');
        const select_selected_text = select_selected_option.innerHTML;
        const select_type = select.getAttribute('data-type');
        const label = '<span class="select__label">Price:</span>';

        if (select_items) {
            select_items.remove();
        }

        let select_type_content = '';
        if (select_type == 'input') {
            select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="????????????" data-value="' + select_selected_text + '" class="select__input"></div>';
        } else {
            select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
        }

   
        select_parent.insertAdjacentHTML('beforeend',
            '<div class="select__item">' +
            `<div class="select__title">${(select.dataset.select === 'price') ? label : ''}` + select_type_content + '</div>' +
            '<div class="select__options">' + select_get_options(select_options) + '</div>' +
            '</div></div>');

        select_actions(select, select_parent);
    }
    function select_actions(original, select) {
        const select_item = select.querySelector('.select__item');
        const select_body_options = select.querySelector('.select__options');
        const select_options = select.querySelectorAll('.select__option');
        const select_type = original.getAttribute('data-type');
        const select_input = select.querySelector('.select__input');

        select_item.addEventListener('click', function () {
            let selects = document.querySelectorAll('.select');
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                const select_body_options = select.querySelector('.select__options');
                if (select != select_item.closest('.select')) {
                    select.classList.remove('_active');
                    _slideUp(select_body_options, 100);
                }
            }
            _slideToggle(select_body_options, 100);
            select.classList.toggle('_active');
        });

        for (let index = 0; index < select_options.length; index++) {
            const select_option = select_options[index];
            const select_option_value = select_option.getAttribute('data-value');
            const select_option_text = select_option.innerHTML;

            if (select_type == 'input') {
                select_input.addEventListener('keyup', select_search);
            } else {
                if (select_option.getAttribute('data-value') == original.value) {
                    select_option.style.display = 'none';
                }
            }
            select_option.addEventListener('click', function () {
                for (let index = 0; index < select_options.length; index++) {
                    const el = select_options[index];
                    el.style.display = 'block';
                }
                if (select_type == 'input') {
                    select_input.value = select_option_text;
                    original.value = select_option_value;
                } else {
                    select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
                    original.value = select_option_value;
                    select_option.style.display = 'none';

                    let event = new Event("change", { bubbles: true });
                    original.dispatchEvent(event);
                }
            });
        }
    }
    function select_get_options(select_options) {
        if (select_options) {
            let select_options_content = '';
            for (let index = 0; index < select_options.length; index++) {
                const select_option = select_options[index];
                const select_option_value = select_option.value;
                if (select_option_value != '') {
                    const select_option_text = select_option.text;
                    select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
                }
            }
            return select_options_content;
        }
    }
    function select_search(e) {
        let select_block = e.target.closest('.select ').querySelector('.select__options');
        let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
        let select_search_text = e.target.value.toUpperCase();

        for (let i = 0; i < select_options.length; i++) {
            let select_option = select_options[i];
            let select_txt_value = select_option.textContent || select_option.innerText;
            if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
                select_option.style.display = "";
            } else {
                select_option.style.display = "none";
            }
        }
    }
    function selects_update_all() {
        let selects = document.querySelectorAll('select');
        if (selects) {
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                select_item(select);
            }
        }
    }

};
	}

	setFontSize() {
		const setFontSize = () => {
			let value = 10 / 1920 * document.documentElement.clientWidth;
			document.documentElement.style.fontSize = value + 'px';
		}

		setFontSize();

		window.addEventListener('resize', setFontSize);
	}

	setWidthVariable() {
		const wrapWords = (el) => {
			el.innerHTML = el.innerText.replace(/\s?[\w|-|'|???]+[\s|,|\.|\?|\!]?/g, '<span class="word">$&</span>');

			if(el.children.length) {
				if(el.children[0].innerText.trim().length <= 2) {
					el.children[0].innerText = el.children[0].innerText + ' ' + el.children[1].innerText;
					el.children[1].remove();
				}
			}
		}
		const getBottomWords = (el) => {
			let elCoord = el.getBoundingClientRect();
			let arr = [];
			Array.from(el.children).forEach(word => {
				let wordCoord = word.getBoundingClientRect();
				if ((elCoord.bottom - wordCoord.bottom) < 1) {
					arr.push(word);
				}
			});
			return arr;
		}

		const setVar = (el, words) => {
			let width = words.reduce((value, item) => {
				return value + item.clientWidth;
			}, 0)
			el.setAttribute('style', `--width: ${width}px`);
		}

		let elements = document.querySelectorAll('[data-set-width-variable]');
		if (elements.length) {
			let postPreviewCardsHandlers = [];

			elements.forEach(el => {

				let link = el.querySelector('a');
				if (link) {
					wrapWords(link);

					const handler = () => {
						let bottomWords = getBottomWords(link);
						Array.from(link.children).forEach(word => word.classList.remove('with-line'));
						bottomWords[0].classList.add('with-line');
						setVar(el, bottomWords);
					}

					handler();

					let id = setInterval(() => {
						handler();
					}, 100);

					setTimeout(() => {
						clearInterval(id);
					}, 1000)

					window.addEventListener('resize', () => {
						let id = setInterval(() => {
							handler();
						}, 100);
	
						setTimeout(() => {
							clearInterval(id);
						}, 500)
					})
				} else if(el.classList.contains('post-preview-card__title')) {
					wrapWords(el);

					const handler = () => {
						let bottomWords = getBottomWords(el);
						Array.from(el.children).forEach(word => word.classList.remove('with-line'));
						bottomWords[0].classList.add('with-line');
						setVar(el, bottomWords);
					}

					handler();
					postPreviewCardsHandlers.push(handler);

					let id = setInterval(() => {
						handler();
					}, 100);

					setTimeout(() => {
						clearInterval(id);
					}, 1000)

					window.addEventListener('resize', () => {
						let id = setInterval(() => {
							handler();
						}, 100);
	
						setTimeout(() => {
							clearInterval(id);
						}, 500)
					})
				}
			})

			this.postPreviewCardsUpdate = () => {
				if(postPreviewCardsHandlers.length) {
					postPreviewCardsHandlers.forEach(f => f());
				}
			}
		}
	}

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

	parallaxInit() {
		let parallaxContainers = document.querySelectorAll('[data-parallax]');
		if (parallaxContainers.length) {
			parallaxContainers.forEach(parallaxContainer => {
				new Parallax(parallaxContainer, {
					selector: '[data-depth]'
				});
			})
		}

		let elements = document.querySelectorAll('.layer');
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

				if(el.closest('.vertical-parallax')) {
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


	componentsBeforeLoad() {
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
		{
    let ratings = document.querySelectorAll('[data-rating]');
    if(ratings.length) {
        ratings.forEach(rating => {
            let count = rating.dataset.rating > 5 ? 5
                        : rating.dataset.rating ? rating.dataset.rating
                        : 0;
                        
            let starsLine = rating.querySelector('.rating__stars-1');

            starsLine.style.width = `calc(${count / 5 * 100}% - ${0.4}rem)`;
        })
    }
}
		{
    let teamList = document.querySelector('[data-team-list]');
    if(teamList) {
        let taemListBody = teamList.querySelector('.team-list__body');
        let btnShowAllList = teamList.querySelector('[data-action="show-all-list"]');
        // init
        if(document.documentElement.clientWidth < 768) {
            let container = document.createElement('div');
            container.className = 'team-list__collapse';
            container.append(...Array.from(taemListBody.children).slice(2));
            taemListBody.append(container);
            taemListBody.classList.add('has-collapse-container');

            if(btnShowAllList) {
                btnShowAllList.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.utils.slideDown(container);

                    btnShowAllList.classList.add('hide');
                })
            }
        }

    }
}
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
		{
    let animationHoverTextContainers = document.querySelectorAll('[data-animation-hover-text]');
    if (animationHoverTextContainers.length) {
        animationHoverTextContainers.forEach(container => {
            const wrapWords = (el) => {
                el.innerHTML = el.innerText.replace(/\s?[\w\-'???]+[\s|,|\.]?/g, '<span class="word">$&</span>');
            }
            const getText = (container) => {
                if (container.children.length) {
                    Array.from(container.children).forEach(el => {
                        if (el.children.length) {
                            Array.from(el.children).forEach(e => {
                                if(e.nodeName === 'BR') {
                                    e.remove();
                                }
                            })
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
                    container.classList.add('_hover');
                    let {top, left, width, height} = getCoords(word, container);
                    setShadowPostion(shadowEl, left, top, width, height);
                }
            })

            container.addEventListener('mouseleave', () => {
                container.classList.remove('_hover');
            })
        })
    }
}
		{
    let postPreviewSections = document.querySelectorAll('[data-post-preview]');
    if (postPreviewSections.length) {
        postPreviewSections.forEach(postPreview => {

            {
                // desc
                const isListLong = (contentEl) => {
                    let listOfPosts = contentEl.querySelector('.post-preview__list');

                    if (listOfPosts) {
                        //init
                        if (listOfPosts.children.length > 4 && !listOfPosts.classList.contains('list-is-open')) {
                            tabsContainer.append(btnLoadMore);
                        } else {
                            btnLoadMore.remove();
                        }
                    }
                }
                let tabsContainer = postPreview.querySelector('.post-preview__desk .post-preview__col');
                let btnLoadMore = document.createElement('a');
                btnLoadMore.className = 'post-preview__load-more link';
                btnLoadMore.innerText = 'Load more';
                btnLoadMore.setAttribute('href', '#');

                let tabsContainers = document.querySelectorAll('[data-tabs-preview]');
                if (tabsContainers.length) {
                    tabsContainers.forEach(tabsContainer => {
                        let triggerItems = tabsContainer.querySelectorAll('[data-tab-trigger]');
                        let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));

                        const getContentItem = (id) => {
                            if (!id.trim()) return;
                            return contentItems.filter(item => item.dataset.tabContent === id)[0];
                        }

                        if (triggerItems.length && contentItems.length) {
                            // init
                            let activeItem = tabsContainer.querySelector('.tab-active[data-tab-trigger]');
                            if (activeItem) {
                                activeItem.classList.add('tab-active');
                                let content = getContentItem(activeItem.dataset.tabTrigger);
                                content.classList.add('tab-active');
                                isListLong(content);
                            } else {
                                triggerItems[0].classList.add('tab-active');
                                let content = getContentItem(triggerItems[0].dataset.tabTrigger);
                                content.classList.add('tab-active');
                                isListLong(content);
                            }
                        }

                        tabsContainer.addEventListener('click', (e) => {
                            if (e.target.closest('[data-tab-trigger]')) {
                                let triggerItems = tabsContainer.querySelectorAll('[data-tab-trigger]');
                                let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));
                                let item = e.target.closest('[data-tab-trigger]');

                                const getContentItem = (id) => {
                                    if (!id.trim()) return;
                                    return contentItems.filter(item => item.dataset.tabContent === id)[0];
                                }

                                item.classList.add('tab-active');
                                let content = getContentItem(item.dataset.tabTrigger);
                                content.classList.add('tab-active');
                                isListLong(content);

                                triggerItems.forEach(i => {
                                    if (i === item) return;

                                    i.classList.remove('tab-active');
                                    getContentItem(i.dataset.tabTrigger).classList.remove('tab-active');
                                })

                                if (this.postPreviewCardsUpdate) this.postPreviewCardsUpdate();
                            }
                        })

                    })
                }

                let contentItems = postPreview.querySelectorAll('.post-preview__content');
                if (contentItems.length) {
                    contentItems.forEach(content => {

                        let listOfPosts = content.querySelector('.post-preview__list');

                        if (listOfPosts) {
                            //init
                            if (listOfPosts.children.length > 4) {
                                Array.from(listOfPosts.children).forEach((item, index) => {
                                    if (index > 3) {
                                        item.classList.add('d-none');
                                    }
                                })
                            }
                        }
                    })
                }

                if (tabsContainer) {
                    tabsContainer.addEventListener('click', (e) => {
                        if (e.target.classList.contains('post-preview__load-more')) {
                            e.preventDefault();
                            let listOfPost = postPreview.querySelector('.post-preview__content.tab-active .post-preview__list');
                            if (listOfPost) {
                                listOfPost.classList.add('list-is-open');
                                Array.from(listOfPost.children).forEach((item, index) => {
                                    item.classList.remove('d-none');
                                });
                                btnLoadMore.remove();
                                this.postPreviewCardsUpdate();
                            }
                        }
                    })
                }
            }

            {
                let contentItems = postPreview.querySelectorAll('.post-preview__mob-item-content');
                if (contentItems.length) {
                    contentItems.forEach(content => {
                        let btnLoadMore = document.createElement('a');
                        btnLoadMore.className = 'post-preview__load-more link';
                        btnLoadMore.innerText = 'Load more';
                        btnLoadMore.setAttribute('href', '#');

                        let listOfPosts = content.querySelector('.post-preview__list');

                        if (listOfPosts) {
                            //init
                            if (listOfPosts.children.length > 4) {
                                listOfPosts.after(btnLoadMore);

                                Array.from(listOfPosts.children).forEach((item, index) => {
                                    if (index > 3) {
                                        item.classList.add('d-none');
                                    }
                                })
                            }

                            btnLoadMore.addEventListener('click', (e) => {
                                e.preventDefault();
                                Array.from(listOfPosts.children).forEach((item, index) => {
                                    item.classList.remove('d-none');
                                });
                                btnLoadMore.classList.add('d-none');
                                this.postPreviewCardsUpdate();
                            })
                        }
                    })
                }
            }
        })
    }
}
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
        
                    video.load();
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

            playVideo();
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
		{
    let casesSections = document.querySelectorAll('[data-cases]');
    if(casesSections.length) {
        casesSections.forEach(cases => {
            let list = cases.querySelector('.cases-list');
            let btnLoadMore = cases.querySelector('.cases-load-more');

            if(list && btnLoadMore) {
                // init
                let listItems = Array.from(list.children);

                if(list.children.length > 2) {
                    listItems.forEach((item, index) => {
                        if(index > 1) {
                            item.classList.add('d-none')
                        }
                    })
                    btnLoadMore.classList.remove('d-none');
                }

                btnLoadMore.addEventListener('click', (e) => {
                    e.preventDefault();
                    let firstHideItem = list.querySelector('li.d-none');
                    if(firstHideItem) {
                        firstHideItem.classList.remove('d-none');

                        if(firstHideItem.nextElementSibling) {
                            firstHideItem.nextElementSibling.classList.remove('d-none');
                        } 
                        if(firstHideItem.nextElementSibling?.nextElementSibling) {
                            firstHideItem.nextElementSibling?.nextElementSibling.classList.remove('d-none');
                        } 
                        if(firstHideItem.nextElementSibling?.nextElementSibling?.nextElementSibling) {
                            firstHideItem.nextElementSibling?.nextElementSibling?.nextElementSibling.classList.remove('d-none');
                        } 
                    } 

                    if( !listItems.some(i => i.classList.contains('d-none')) ) {
                        btnLoadMore.classList.add('d-none');
                    }
                })
            }
        })
    }
}
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
		{
    let tagsList = document.querySelector('[data-tags-list]');
    if(tagsList) {
        let toggleButton = document.querySelector('[data-toggle-visible-tags]');
        if(toggleButton) {
            let btnTextCloseState = toggleButton.dataset?.buttonText.split(',')[0];
            let btnTextOpenState = toggleButton.dataset?.buttonText.split(',')[1];

            toggleButton.addEventListener('click', (e) => {
                e.preventDefault();

                if(tagsList.classList.contains('hide-content-is-open')) {
                    tagsList.classList.remove('hide-content-is-open')
                    this.utils.slideUp(tagsList);
                    toggleButton.innerText = btnTextCloseState;
                    toggleButton.classList.remove('hide-content-is-open');
                } else {
                    tagsList.classList.add('hide-content-is-open')
                    this.utils.slideDown(tagsList, 500, true);
                    toggleButton.innerText = btnTextOpenState;
                    toggleButton.classList.add('hide-content-is-open');
                }
            })
        }
    }
}
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
	}

	componentsAfterLoad() {

	}

}

let app = new App();
app.init();


