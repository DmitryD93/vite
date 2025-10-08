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

// window.addEventListener('load',() => {
//     gsap
//         .timeline({
//             scrollTrigger: {
//                 trigger: '.main',
//                 start: 'top top',
//                 end: '+=150%',
//                 pin: true,
//                 scrub: true,
//                 markers: true,
//             },
//         })
//         .to('.space-anima__image', {
//             scale: 2,
//             z: 350,
//             transformOrigin: 'center center',
//             ease: 'power1.inOut',
//         })
//
//         .to('.hero',{
//             scale: 1.1,
//             transformOrigin: 'center center',
//             ease: 'power1.inOut',
//         }, '<');
// })

// window.addEventListener('load',() => {
//     gsap
//         .timeline({
//             scrollTrigger: {
//                 trigger: '.wrapper',
//                 start: 'top top',
//                 end: '+=80%',
//                 pin: true,
//                 scrub: true,
//                 markers: true,
//             },
//         })
//         .to('.space-anima__image', {
//             scale: 1.3,
//             z: 200,
//             transformOrigin: 'center center',
//             ease: 'power1.inOut',
//         })
//
// })

window.addEventListener('load',() => {
    gsap.set('.space-anima__image', {
        filter: 'brightness(0.3) saturate(0.3)'
    });
    gsap
        .timeline({
            scrollTrigger: {
                trigger: '.wrapper',
                start: 'top top',
                end: '+=80%',
                pin: true,
                scrub: true,
                markers: false,
            },
        })
        .to('.space-anima__image', {
            scale: 1.3,
            z: 200,
            transformOrigin: 'center center',
            ease: 'power1.inOut',
        })
        .to('.space-anima__image', {
            filter: 'brightness(1) saturate(1)',
            ease: 'power1.inOut',
        }, '<')
})

