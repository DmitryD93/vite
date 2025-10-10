/*********************************************************************************/
// Аккордеон
// Для подключения аккордеона просто раскомментируйте код ниже
// Импорт Accordion обязателен для инициализации
// В класс вы можете передать параметры - селектор аккордеона в вашем DOM и опции
/*********************************************************************************/
import Accordion from '@modules/accordion';
// document.addEventListener('DOMContentLoaded', () => {
//     let acc = new Accordion('.acc',{
//         transition: 'height 0.3s ease',
//         multiple: false
//     });
// });


//************ GSAP ******************//
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

console.clear();

gsap.registerPlugin(ScrollTrigger)

window.addEventListener('load',() => {
    gsap.set('.space-anima__image', {
        filter: 'brightness(0.4) saturate(0.4)'
    });
    gsap
        .timeline({
            scrollTrigger: {
                trigger: '.space-wrapper',
                start: 'top top',
                end: '+=80%',
                pin: true,
                scrub: true,
                markers: false,
            },
        })
        .to('.space-anima__image', {
            scale: 1.2,
            z: 200,
            transformOrigin: 'center center',
            ease: 'power1.inOut',
        })
        .to('.space-anima__image', {
            filter: 'brightness(1) saturate(1)',
            ease: 'power1.inOut',
        }, '<')
})

// document.addEventListener('DOMContentLoaded', () => {
//     window.addEventListener('scroll', e => {
//         const spaceImageContainer = document.querySelector('.space-image-container');
//         let bgHeight = spaceImageContainer.scrollHeight;
//         console.log(bgHeight);
//
//         document.documentElement.style.setProperty('--bgHeight', `${bgHeight}px`);
//     });
// });