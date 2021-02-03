const preloader = () => {
    // document.body.classList.add('no-scroll');
    document.querySelector('.preloader__image').classList.add('.filling');
    window.onload = () => {
        // preloaderBlock.classList.add('animation');
        setTimeout(() => {
            // document.body.classList.remove('no-scroll');
            document.querySelector('.preloader').classList.add('animation');
            setTimeout(() => {
                document.querySelector('.preloader').classList.add('loaded');
            }, 500)
        }, 500)
    }
}

preloader();