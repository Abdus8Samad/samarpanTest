export const getElemDistance = (elem) => {
    let location = 0;
    if (elem.offsetParent) {
        do {
            location += elem.offsetTop;
            elem = elem.offsetParent;
        } while (elem);
    }
    return location >= 0 ? location : 0;
};

export const visible = (elem) => {
    let diff = 450;
    let top = getElemDistance(elem);
    return (top <= window.scrollY + (diff));
};

export const scrollingEffect = () =>{
    let scrollToTop = document.querySelector('.scrollToTop');
    if(window.scrollY <= 300){
        scrollToTop.style.opacity = 0;
        scrollToTop.style.visibility = "hidden";
    }
    else {
        scrollToTop.style.opacity = 0.75;
        scrollToTop.style.visibility = "visible";
    }
    let scrollEffect = document.querySelectorAll('.scrollEffect');
    let allElems = document.querySelectorAll('*');
    for(let x = 0;x < scrollEffect.length;x++) if(visible(scrollEffect[x])) scrollEffect[x].classList.add("alreadyVisible", "come-in");
    let alreadyVisible = document.querySelectorAll('.alreadyVisible');
    if(alreadyVisible.length !== scrollEffect.length){
        for(let x = 0;x < scrollEffect.length;x++){
            if(visible(scrollEffect[x])){
                if(!scrollEffect[x].classList.contains('alreadyVisible')){
                    scrollEffect[x].classList.add('come-in','alreadyVisible');
                }
            }
        }
    }
};
