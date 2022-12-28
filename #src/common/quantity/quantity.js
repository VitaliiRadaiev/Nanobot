{
    let quantityAll = document.querySelectorAll('[data-quantity]');
    if(quantityAll.length) {
        quantityAll.forEach(quantity => {
            let buttons = quantity.querySelectorAll('.quantity__button');
            let input = quantity.querySelector('input');

            if(buttons.length && input) {
                buttons.forEach(button => {
                    button.addEventListener("click", function (e) {
                        let value = input.value;
                        if (button.classList.contains('quantity__button--plus')) {
                            value++;
                        } else {
                            value = value - 1;
                            if (value < 1) {
                                value = 1
                            }
                        }
                        input.value = value;
                    });
                })
            }
        })
    }
}
