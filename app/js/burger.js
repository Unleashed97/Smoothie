const burger = () => {
    const burgerBtn = document.querySelector('.burger');
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    const body = document.querySelector('body');
    
    burgerBtn.addEventListener('click', e => {
        header.classList.add('active');
        body.classList.add('no-scroll');
        nav.classList.add('active');
        burgerBtn.classList.add('active')
    });


}

burger();
