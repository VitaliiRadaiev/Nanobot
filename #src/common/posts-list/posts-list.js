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