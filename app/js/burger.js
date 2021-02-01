const burger = () => {
    const burgerBtn = document.querySelector('.burger');
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    const body = document.querySelector('body');
    
    burgerBtn.addEventListener('click', e => {
        header.classList.toggle('active');
        body.classList.toggle('no-scroll');
        nav.classList.toggle('active');
        burgerBtn.classList.toggle('active');
    });


}

burger();
