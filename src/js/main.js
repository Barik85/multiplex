const Burger = document.querySelector('.burger-box');
const mobileMenu = document.querySelector('.mobile-menu');

Burger.onclick = function(){
    mobileMenu.classList.toggle('visible');
};