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