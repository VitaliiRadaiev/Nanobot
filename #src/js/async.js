class LazyScripts {
    init() {
        this.popupHandler();
        this.slidersInit();
        this.tabsInit();
        this.spollerInit();
        this.inputMaskInit();
        this.initSmoothScroll();
        this.selectInit();
        this.setWidthVariable();
        //this.initScrollAnimationTrigger();
        //this.parallaxInit();
        this.componentsBeforeLoad();
    }

    popupHandler() {
		@@include('../common/popup/popup.js')
	}

    slidersInit() {
		@@include('../common/awards/awards.js')
		@@include('../common/carousel/carousel.js')
		@@include('../common/testimonials-slider-card/testimonials-slider-card.js')
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
		@@include('../common/select/select.js');
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
		@@include('../common/grid-links/grid-links.js')
		@@include('../common/rating/rating.js')
		@@include('../common/team-list/team-list.js')
		@@include('../common/banner/banner.js')
		@@include('../common/animation-hover-text/animation-hover-text.js')
		@@include('../common/post-preview/post-preview.js')
		// @ @include('../common/bg-decor/bg-decor.js')
		@@include('../common/cases/cases.js')
		@@include('../common/hide-content/hide-content.js')
		@@include('../common/posts-list/posts-list.js')
		@@include('../common/sticky-box/sticky-box.js')
	}
}

