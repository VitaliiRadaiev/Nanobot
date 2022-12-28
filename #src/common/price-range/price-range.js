{
    let rangeAll = document.querySelectorAll('[data-price-range]');
    if (rangeAll.length) {
        rangeAll.forEach(range => {
            let min = range.dataset.min;
            let max = range.dataset.max;
            let numStart = range.dataset.start;
            let numEnd = range.dataset.end;
            let step = range.dataset.step;
            let slider = range.querySelector('.price-range__slider');
            let inputStart = range.querySelector('.price-range__input--start');
            let inputEnd = range.querySelector('.price-range__input--end');

            noUiSlider.create(slider, {
                start: [+numStart, +numEnd],
                connect: true,
                range: {
                    'min': [+min],
                    'max': [+max],
                },
                step: +step,
                tooltips: true,
                format: wNumb({
                    decimals: 0
                })
            });

            let numFormat = wNumb({ decimals: 0, thousand: ',' });

            slider.noUiSlider.on('update', function (values, handle) {
                let value = values[handle];
                if (handle) {
                    inputEnd.value = Math.round(value);
                } else {
                    inputStart.value = Math.round(value);
                }
            });

            slider.noUiSlider.on('change', (values, handle) => {
                let value = values[handle];
                if (handle) {
                    let event = new Event("change", { bubbles: true });
                    inputEnd.dispatchEvent(event);
                } else {
                    let event = new Event("change", { bubbles: true });
                    inputStart.dispatchEvent(event);
                }

            })

            inputStart.addEventListener('change', function () {
                slider.noUiSlider.set([this.value, null]);
            });
            inputEnd.addEventListener('change', function () {
                slider.noUiSlider.set([null, this.value]);
            });
        })
    }

}
