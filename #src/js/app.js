@@include('files/utils.js');
@@include('files/dynamic_adapt.js');

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
		@@include('../common/header/header.js');
	}

	popupHandler() {
		@@include('../common/popup/popup.js');
	}

	slidersInit() {
		@@include('../common/awards/awards.js');
		@@include('../common/carousel/carousel.js');
		@@include('../common/testimonials-slider-card/testimonials-slider-card.js');
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
		@@include('../common/select/select.js');
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
		let elements = document.querySelectorAll('[data-set-width-variable]');
		if(elements.length) {
			elements.forEach(el => {
				const setVar = () => {
					el.setAttribute('style', `--width: ${el.clientWidth}px`);
				}
				setVar();

				setInterval(() => {
					setVar();
				},100)
			})
		}
	}

	initScrollAnimationTrigger() {
		const setScrollTrigger = (el, offset, callback = null) => {
			let triggerPoint = document.documentElement.clientHeight / 100 * (100 - offset);
			const trigger = () => {
				if(el.getBoundingClientRect().top <= triggerPoint && !el.classList.contains('show-animation')) {
					if(typeof callback === 'function') {
						callback();
					}
					el.classList.add('show-animation')
				}
			}
		
			trigger();
		
			window.addEventListener('scroll', trigger);
		}

		let elements = document.querySelectorAll('[data-scroll-animation-trigger]');
		if(elements.length) {
			elements.forEach(el => {
				setScrollTrigger(el, 15);
			})
		}
	}

	parallaxInit() {
		let parallaxContainers = document.querySelectorAll('[data-parallax]');
		if(parallaxContainers.length) {
			parallaxContainers.forEach(parallaxContainer => {
				new Parallax(parallaxContainer, {
					selector: '.layer'
				});
			})
		}  

		let elements = document.querySelectorAll('.layer img');
		if(elements.length) {
			
			const translateY = (el, value, offset) => {
				el.style.transform = `translateY(${value / (offset ? offset : 10)}px)`;
			}

			const rotate = (el, value) => {
				el.style.transform = `rotate(${(value * 0.02) - 10}deg)`;
			}

			const scale = (el, value) => {
				el.style.transform = `scale(${(value * -0.002)})`;
			}

			const parallaxHandler = (el) => {
				let pageY = window.pageYOffset;
				let top = el.getBoundingClientRect().top + (el.clientHeight / 2);
				let value = (pageY + top) - (pageY + document.documentElement.clientHeight / 2);
				
				translateY(el, value, 8);
	
			}

			elements.forEach(el => {
				console.log(el);
				parallaxHandler(el);
				window.addEventListener('scroll', () => parallaxHandler(el));
			})
		}
	}


	componentsBeforeLoad() {
		@@include('../common/grid-links/grid-links.js');
		@@include('../common/rating/rating.js');
		@@include('../common/team-list/team-list.js');
		@@include('../common/banner/banner.js');
		@@include('../common/animation-hover-text/animation-hover-text.js');
	}

	componentsAfterLoad() {

	}

}

let app = new App();
app.init();


