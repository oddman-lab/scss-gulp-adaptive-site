let mobileMenu = document.querySelector('.main-nav__list');
let menuToggle = document.querySelector('.main-nav__toggle');
let mobileLogo = document.querySelector('.after-mobile-hidden');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('mobile-hidden')
    menuToggle.classList.toggle('animation--togle')
    mobileLogo.classList.toggle('mobile-hidden')

});