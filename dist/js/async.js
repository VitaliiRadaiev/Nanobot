class LazyScripts {
	init() {

		this.slidersInit();
		this.tabsInit();
		this.spollerInit();
		this.inputMaskInit();
		this.initSmoothScroll();
		this.selectInit();
		this.setWidthVariable();
		this.componentsBeforeLoad();
		this.fancyBox();
	}

	popupHandler() {
		// ==== Popup form handler====

const popupLinks = document.querySelectorAll('[data-popup="open-popup"]');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('[data-popup="lock-padding"]');

let unlock = true;

const timeout = 400;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('[data-popup="close-popup"]');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.popup--open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('popup--open');
		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});

	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('popup--open');
		if (doUnlock) {
			bodyUnlock();
		}

		let video = popupActive.querySelector('.popup__video');
		if (video) video.innerHTML = '';
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');
	if (targetPadding.length) {
		for (let index = 0; index < targetPadding.length; index++) {
			const el = targetPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('overflow-hidden');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');

	setTimeout(function () {
		if (targetPadding.length) {
			for (let index = 0; index < targetPadding.length; index++) {
				const el = targetPadding[index];
				el.style.paddingRight = '0px';
			}
		}

		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}

		body.style.paddingRight = '0px';
		body.classList.remove('overflow-hidden');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.popup--open');
		popupClose(popupActive);
	}
});

// === Polyfill ===
(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node == node.parentElement;
			}
			return null;
		};
	}
})();

(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.mozMatchesSelector;
	}
})();
// === AND Polyfill ===

// добавление API попапа в глобалную видимость
window.popup = {
	open(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		let video = popup.querySelector('video');
		if (video) {
			let isPlaying = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, 'playing');
			if(!isPlaying) {
				Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
					get: function () {
						return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
					}
				});
			}

			const playVideo = () => {
				video.play();

				if (!video.playing) {
					setTimeout(() => {
						playVideo()
					}, 100)
				}
			}

			playVideo();
		}

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
        let btnLeft = awards.querySelector('.awards__shadow-left');
        let btnRight = awards.querySelector('.awards__shadow-right');

        let sliderData = new Swiper(awards.querySelector('.swiper'), {
            speed: 600,
            navigation: {
                nextEl: btnRight,
                prevEl: btnLeft,
            },
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

        setTimeout(() => {
            sliderData.update();
        },1000)
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

        sliderData.on('afterInit', () => {
            setButtonsVisibility(sliderData);
        })
        sliderData.on('transitionStart', (sliderData) => {
            setButtonsVisibility(sliderData);
        })


        // let idBtnRight = null;
        // btnRight.addEventListener('mouseenter', () => {
        //     sliderData.slideNext();
        //     idBtnRight = setInterval(() => {
        //         sliderData.slideNext();
        //     },1000)
        // })
        // btnRight.addEventListener('mouseleave', () => {
        //     clearInterval(idBtnRight);
        // })

        // let idBtnLeft = null;
        // btnLeft.addEventListener('mouseenter', () => {
        //     sliderData.slidePrev();
        //     idBtnLeft = setInterval(() => {
        //         sliderData.slidePrev();
        //     },1000)
        // })
        // btnLeft.addEventListener('mouseleave', () => {
        //     clearInterval(idBtnLeft);
        // })
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
                        spaceBetween: 40,
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

            setTimeout(() => {
                sliderData.update();
            },1000)
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

						if (this.postPreviewCardsUpdate) this.postPreviewCardsUpdate();
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
							content && utils.slideToggle(content);

							if (isOneActiveItem) {
								triggers.forEach(i => {
									if (i === trigger) return;

									let parent = i.parentElement;
									let content = i.nextElementSibling;

									parent.classList.remove('active');
									i.classList.remove('active');
									content && utils.slideUp(content);
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
				let input = item.querySelector('input[type="text"]');

				input.addEventListener('input', (e) => {
					if (input.value.length > 1) {
						if (input.value.endsWith('+')) {
							input.value = input.value.slice(0, -1);
							return;
						}
					}
					input.value = input.value.replace(/[^0-9+]/g, '');
				})
			})
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
            select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
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

	setWidthVariable() {
		const wrapWords = (el) => {
			el.innerHTML = el.innerText.replace(/\s?[\w|-|'|’]+[\s|,|\.|\?|\!]?/g, '<span class="word">$&</span>');

			if (el.children.length) {
				if (el.children[0].innerText.trim().length <= 2) {
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
					let text = wrapWordsInSpan(link.innerText);
					link.innerHTML = text;

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
				} else if (el.classList.contains('post-preview-card__title')) {
					let text = wrapWordsInSpan(el.innerHTML);
					el.innerHTML = text;

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
				if (postPreviewCardsHandlers.length) {
					postPreviewCardsHandlers.forEach(f => f());
				}
			}
		}

		function wrapWordsInSpan(text) {
			const words = text.split(/(<.*?>|\s+)/);

			const wordsInSpans = words.map(word => {
				if (word.match(/<.*?>/)) {
					return word;
				} else if (word.trim() !== '') {
					return `<span class="word">${word}</span>`;
				} else {
					return word;
				}
			});

			const wrappedText = wordsInSpans.join('');

			return wrappedText;
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
                    utils.slideDown(container);

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
        if (document.documentElement.clientWidth >= 768) {
            animationHoverTextContainers.forEach(container => {
                const wrapWords = (el) => {
                    el.innerHTML = el.innerText.replace(/\s?[\w\-'’]+[\s|,|\.]?/g, '<span class="word">$&</span>');
                }
                const getText = (container) => {
                    if (container.children.length) {
                        Array.from(container.children).forEach(el => {
                            if (el.children.length) {
                                Array.from(el.children).forEach(e => {
                                    if (e.nodeName === 'BR') {
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

                let text = wrapWordsInSpan(container.innerHTML);
                container.innerHTML = text;

                // set Shadow
                let shadowEl = document.createElement('div');
                shadowEl.className = 'text-bg-shadow';
                container.append(shadowEl);

                container.addEventListener('mousemove', (e) => {
                    let word = e.target.closest('.word');
                    if (word) {
                        container.classList.add('_hover');
                        let { top, left, width, height } = getCoords(word, container);
                        setShadowPostion(shadowEl, left, top, width, height);
                    }
                })

                container.addEventListener('mouseleave', () => {
                    container.classList.remove('_hover');
                })
            })
        }
    }

    function wrapWordsInSpan(text) {
        const words = text.split(/(<.*?>|\s+)/);

        const wordsInSpans = words.map(word => {
            if (word.match(/<.*?>/)) {
                return word;
            } else if (word.trim() !== '') {
                return `<span class="word">${word}</span>`;
            } else {
                return word;
            }
        });

        const wrappedText = wordsInSpans.join('');

        return wrappedText;
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
		// @ @include('../common/bg-decor/bg-decor.js')
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
		{
    let tagsList = document.querySelector('[data-tags-list]');
    if (tagsList) {
        let toggleButton = document.querySelector('[data-toggle-visible-tags]');
        if (toggleButton) {
            let btnTextCloseState = toggleButton.dataset?.buttonText.split(',')[0];
            let btnTextOpenState = toggleButton.dataset?.buttonText.split(',')[1];

            toggleButton.addEventListener('click', (e) => {
                e.preventDefault();

                if (tagsList.classList.contains('hide-content-is-open')) {
                    tagsList.classList.remove('hide-content-is-open')
                    utils.slideUp(tagsList);
                    toggleButton.innerText = btnTextCloseState;
                    toggleButton.classList.remove('hide-content-is-open');
                } else {
                    tagsList.classList.add('hide-content-is-open')
                    utils.slideDown(tagsList, 500, true);
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

	fancyBox() {
		let fancyBoxTriggers = document.querySelectorAll('[data-fancybox]');
		if (fancyBoxTriggers.length) {
			let fancyBoxContainer = addToHtmlFancyBox();
			let videoContainer = fancyBoxContainer.querySelector('.popup__video');

			this.popupHandler();
			loadYoutubeAndVimeoApi();

			fancyBoxTriggers.forEach(trigger => {
				trigger.addEventListener('click', (e) => {
					e.preventDefault();

					if (/youtu\.be/.test(trigger.href) || /www\.youtube\.com/.test(trigger.href)) {
						let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
						let match = trigger.href.match(regExp);
						let id = (match && match[7].length == 11) ? match[7] : false;

						setVideo('youtube', videoContainer, id);
						window.popup.open('#fancy-box-video');
						return;
					}

					if (/vimeo/.test(trigger.href)) {
						let regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/
						let match = trigger.href.match(regExp);
						let id = (match && match[5].length == 8) ? match[5] : false;

						setVideo('vimeo', videoContainer, id);
						window.popup.open('#fancy-box-video');
						return;
					}

					setVideo('htmlVideo', videoContainer, trigger.href);
					window.popup.open('#fancy-box-video');
				})
			})

			function setVideo(typeOfVideo, container, src) {
				switch (typeOfVideo) {
					case 'youtube':
						{
							let iframe = document.createElement('div');
							container.append(iframe);
							new YT.Player(iframe, {
								height: 'auto',
								width: 'auto',
								videoId: src,
								playerVars: {
									autoplay: 1,
								}
							})
						}
						break;
					case 'vimeo':
						{
							let iframe = document.createElement('div');
							container.append(iframe);
							new Vimeo.Player(iframe, {
								id: src,
								autoplay: true,
								width: 'auto',
								height: 'auto'
							})
						}
						break;
					case 'htmlVideo':
						container.innerHTML = `
							<video playsinline="" controls="" controlslist="nodownload" tabindex="0">
								<source src="${src}" type="video/mp4">Sorry, your browser doesn't support embedded videos.
							</video>
						`;
						break;
				}
			}

			function addToHtmlFancyBox() {
				let container = document.createElement('div');
				container.insertAdjacentHTML('beforeend', `
				<div class="popup " id="fancy-box-video">
					<div class="popup__close" data-popup="close-popup"><span></span></div>
					<div class="popup__body">
						<div class="popup__content">
							<div class="popup__video">
								
							</div>
						</div>
					</div>
				</div>
				`)
				document.body.append(container);
				return container;
			}

			function loadYoutubeAndVimeoApi() {
				let scriptYoutube = document.createElement('script');
				scriptYoutube.src = "https://www.youtube.com/iframe_api";
				document.body.append(scriptYoutube);

				let scriptVimeo = document.createElement('script');
				scriptVimeo.src = "https://player.vimeo.com/api/player.js";
				document.body.append(scriptVimeo);
			}
		}
	}
}

