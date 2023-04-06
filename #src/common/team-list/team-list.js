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