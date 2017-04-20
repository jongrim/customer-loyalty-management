var nav = (function () {
    const nav = document.querySelector('.nav');
    const topOfNav = nav.offsetTop;

    //bind scroll event to determine when the nav has been reached
    window.addEventListener('scroll', fixNav);

    function fixNav() {
        if (window.scrollY >= topOfNav) {
            document.body.style.paddingTop = nav.offsetHeight + 'px';
            nav.classList.add('fixed-nav');
        } else {
            nav.classList.remove('fixed-nav');
            document.body.style.padding = 0;
        }
    }
})();
