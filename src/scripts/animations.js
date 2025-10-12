//************ GSAP ******************//
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

console.clear();

gsap.registerPlugin(ScrollTrigger)

window.addEventListener('load',() => {
    //****************** Анимация звездного фона *******************************/
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
            z: 180,
            transformOrigin: 'center center',
            ease: 'power1.inOut',
        })
        .to('.space-anima__image', {
            filter: 'brightness(1) saturate(1)',
            ease: 'power1.inOut',
        }, '<')


//     // Анимация текста
//     const title = document.querySelector('.space-wrapper__title');
//     const text = title.textContent;
//
//     function createLetterSpans() {
//         title.innerHTML = '';
//
//         const words = text.split(' ');
//
//         words.forEach((word, wordIndex) => {
//             const wordSpan = document.createElement('span');
//             wordSpan.style.display = 'inline-block';
//             wordSpan.style.whiteSpace = 'nowrap';
//             wordSpan.style.opacity = '1';
//
//
//             for (let i = 0; i < word.length; i++) {
//                 const letterSpan = document.createElement('span');
//                 letterSpan.textContent = word[i];
//                 letterSpan.style.opacity = '1';
//                 letterSpan.style.display = 'inline-block';
//                 wordSpan.appendChild(letterSpan);
//             }
//
//             title.appendChild(wordSpan);
//
//             if (wordIndex < words.length - 1) {
//                 const spaceSpan = document.createElement('span');
//                 spaceSpan.innerHTML = '&nbsp;';
//                 spaceSpan.style.display = 'inline-block';
//                 spaceSpan.style.opacity = '1';
//                 title.appendChild(spaceSpan);
//             }
//         });
//     }
//
//     createLetterSpans();
//
//     gsap.set('.space-wrapper__title', {
//         backgroundImage: "linear-gradient(90deg, #FFFFFF, #F0F8FF, #E6F3FF, #F0FFF0, #FFF8F0)",
//         backgroundSize: "500% 100%",
//         backgroundClip: "text",
//         WebkitBackgroundClip: "text",
//         color: "transparent",
//         filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.7))"
//     });
//
// // Плавная анимация градиента
//     gsap.to('.space-wrapper__title', {
//         backgroundPosition: "500% 0%",
//         duration: 12,
//         repeat: -1,
//         ease: "power1.inOut"
//     });
//
//     const glowAnimation = gsap.timeline({ repeat: -1 });
//     glowAnimation
//         .to('.space-wrapper__title', {
//             filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))",
//             duration: 3,
//             ease: "sine.inOut"
//         })
//         .to('.space-wrapper__title', {
//             filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.9))",
//             duration: 3,
//             ease: "sine.inOut"
//         });
//
//     function startAnimation() {
//         const letterSpans = document.querySelectorAll('.space-wrapper__title span span');
//         gsap.set(letterSpans, { opacity: 0 });
//
//         const tl = gsap.timeline();
//
//         tl.to(letterSpans, {
//             opacity: 1,
//             duration: 0.15,
//             stagger: {
//                 each: 0.1,
//                 from: "start"
//             },
//             ease: "power2.out",
//             onComplete: function() {
//                 setTimeout(startAnimation, 2000);
//             }
//         });
//     }
//
//     startAnimation();

    // *************************** Первый текст ********************/
    gsap.set('.space-wrapper__title', {
        backgroundImage: "linear-gradient(90deg, #FFFFFF, #F0F8FF, #E6F3FF, #F0FFF0, #FFF8F0)",
        backgroundSize: "500% 100%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        opacity: 0,
        textShadow: "0 0 0px rgba(255,255,255,0)",
        scale: 0.9,
        filter: "brightness(0.5)"
    });

    const neonTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.space-wrapper__title',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: "play reverse play reverse",
            markers: false
        }
    });

    neonTl
        .to('.space-wrapper__title', {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        })
        .to('.space-wrapper__title', {
            scale: 1,
            filter: "brightness(1)",
            duration: 1,
            ease: "back.out(1.7)"
        }, "-=0.5")
        .to('.space-wrapper__title', {
            textShadow: "0 0 30px rgba(255,255,255,0.8)",
            duration: 0.5,
            ease: "power2.out"
        })
        .to('.space-wrapper__title', {
            backgroundPosition: "500% 0%",
            duration: 8,
            repeat: -1,
            ease: "power1.inOut"
        }, "-=0.8");

// Мерцание неона
    gsap.to('.space-wrapper__title', {
        textShadow: "0 0 40px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 255, 255, 0.5)",
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        repeatDelay: 1
    });

//************* Плейсхолдер для поиска ***********************//

    const searchInput = document.querySelector('.main-hero__search-input');
    const placeholderTexts = [
        "Search with keywords",
    ];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let typingTimeout;

    function typePlaceholder() {
        const currentText = placeholderTexts[currentTextIndex];

        if (isDeleting) {
            searchInput.placeholder = currentText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            searchInput.placeholder = currentText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && currentCharIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % placeholderTexts.length;
            typingSpeed = 500;
        }

        typingTimeout = setTimeout(typePlaceholder, typingSpeed);
    }


    searchInput.addEventListener('focus', function() {
        clearTimeout(typingTimeout);
        searchInput.placeholder = "";
    });


    searchInput.addEventListener('blur', function() {
        if (searchInput.value === '') {
            currentCharIndex = 0;
            isDeleting = false;
            currentTextIndex = 0;
            typePlaceholder();
        }
    });

// Запускаем анимацию
    typePlaceholder();

    //************** анимация шапки **************//

    gsap.set('.header', {
        y: -70,
        opacity: 0
    });

    gsap.to('.header', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.header',
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: "play none none reverse",
            markers: false
        }
    });

//**************** анимация main блока **************//
    gsap.set('.main', {
        y: 100,
        opacity: 0,
        scale: 0.95
    });

    gsap.to('.main', {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.main',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: "play none none reverse",
            markers: false
        }
    });

//************* Анимация списка (появление карточек) *************//
    gsap.set('.main-hero__list-item', {
        opacity: 0,
        y: 60
    });


    document.querySelectorAll('.main-hero__list-item').forEach((item, index) => {
        gsap.to(item, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: "play none none reverse",
                markers: false
            }
        });
    });

    //********** Анимация сайдбара слева **********//
    gsap.set('.main-hero__sidebar', {
        opacity: 0,
        x: -100
    });

    gsap.to('.main-hero__sidebar', {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.main-hero__sidebar',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: "play none none reverse",
            markers: false
        }
    });


    //********** Анимация футера **********//
    gsap.set('.footer', {
        opacity: 0,
        y: -100
    });

    gsap.to('.footer', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 75%',
            end: 'bottom 25%',
            toggleActions: "play none none reverse",
            markers: false
        }
    });

})