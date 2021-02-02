let statCounting = () => {
    const statNumbers = document.querySelectorAll('.stat__count');
    const statBlock = document.querySelector('.stat');
    
    let scrolled = false;
    window.addEventListener('scroll', () =>{
        
        if(scrolled == false && document.documentElement.clientHeight + pageYOffset > statBlock.offsetTop){
            statNumbers.forEach(num => {
    
                let startValue = 0;
                let targetValue = +num.getAttribute('data-target');
                let speed = 100;
                let count = startValue;
        
                const updateCount = () => {

                    num.innerText = Math.floor(count);
        
                    let inc = targetValue / speed;
        
                    if(count < targetValue){
                        count += inc;
                        setTimeout(updateCount, 10)
                    }
                    else num.innerText = targetValue;
                }
                updateCount()
            })
            scrolled = true;
        }
    })

    
}

statCounting();