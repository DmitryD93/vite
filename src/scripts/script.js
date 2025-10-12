document.addEventListener('DOMContentLoaded', e => {
    const headerBurger = document.querySelector('.header-burger');
    const headerNav = document.querySelector('.header__nav-list');

    headerBurger.addEventListener('click', () => {
        headerNav.classList.toggle('active');
        headerBurger.classList.toggle('active');
    })
})