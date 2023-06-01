import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
gsap.registerPlugin(ScrollTrigger);

//! Menu
const menuButton = document.querySelector('.menu-button');
const firstWordMenu = document.querySelectorAll('.menu-wrapper__first-word');
const secondWordMenu = document.querySelectorAll('.menu-wrapper__second-word');
let isMenuOpen = false;

const tl = gsap.timeline({
   onStart: function () {
      toggleButtonInteraction(false);
   },
   onComplete: function () {
      toggleButtonInteraction(true);
   },
});
const tl_2 = gsap.timeline({
   onStart: function () {
      toggleButtonInteraction(false);
   },
   onComplete: function () {
      toggleButtonInteraction(true);
   },
});
function toggleButtonInteraction(enabled) { 
   if (enabled) {
     menuButton.style.pointerEvents = 'auto';
     menuButton.style.touchAction = 'auto';
   } else {
     menuButton.style.pointerEvents = 'none';
     menuButton.style.touchAction = 'none';
   }
 }
menuButton.addEventListener('click', () => {
   if (!isMenuOpen) {
      gsap.to(
         [firstWordMenu, secondWordMenu],
         {
            y: '-100%',
         }
      )
      tl.to(
         '.nav',
         {
            x: 0,
            ease: 'Expo.easeIn',
         }
      ).to(
         '.nav__separator',
         {
            x: '0%'
         }
      ).to(
         '.nav__item_grey',
         {
            backgroundColor: 'rgb(140, 140, 140, 0.2)',
         }
      ).to(
         '.text-letter',
         {
            y: '0%',
            duration: 0.05,
            stagger: 0.02,
         }, '<0.1'
      ).to(
         '.nav__copy',
         {
            y: '0%',
            opacity: 1,
         }, '<'
      ).to(
         '.nav__soc-link',
         {
            y: '0%',
            opacity: 1,
            stagger: 0.1,
         }, '<'
      );
   } else {
      gsap.to(
         [firstWordMenu, secondWordMenu],
         {
            y: '0%',
         }
      )
      tl_2.to(
         '.nav__soc-link',
         {
            y: '30%',
            opacity: 0,
            stagger: -0.1,
         },
      ).to(
         '.nav__copy',
         {
            y: '50%',
            opacity: 0
         }, '<0.3'
      ).to(
         '.text-letter',
         {
            y: '110%',
            duration: 0.05,
            stagger: 0.02,
         }, '<0.1'
      ).to(
         '.nav__item_grey',
         {
            backgroundColor: 'rgb(140, 140, 140, 0)',
         }
      ).to(
         '.nav__separator',
         {
            x: '100%'
         }
      ).to(
         '.nav',
         {
            x: '150%',
         }
      );
   }

   isMenuOpen = !isMenuOpen;
});


//! Buttons
const button = document.querySelector('.button');
const distance = 10;

button.addEventListener('mousemove', (e) => {
   const { offsetX: x, offsetY: y } = e;
   const { offsetWidth: width, offsetHeight: height } = button;

   const xValue = Math.round((x / width) * distance - distance / 2);
   const yValue = Math.round((y / height) * distance - distance / 2);

   button.style.transform = `translate(${xValue}px, ${yValue}px)`;

   button.addEventListener('mouseleave', () => {
      button.style.transform = `translate(0)`;
   });
});

//! Text
//~ Separate each letter into individual spans
const textWords = document.querySelectorAll('.text-word');

//~ Loop through each text word element

textWords.forEach(textWord => {
   //` Separate each letter into individual spans
   const letters = textWord.textContent.split('');
   const separatedLetters = letters.map(letter => `<span class="text-letter">${letter}</span>`);
   textWord.innerHTML = separatedLetters.join('');
});

const textWrappers = document.querySelectorAll('.text-wrapper');

function synchronizeLetters(textWrapper) {
   const firstLetters = textWrapper.querySelectorAll('.text-word:first-child .text-letter');
   const secondLetters = textWrapper.querySelectorAll('.text-word:nth-child(2) .text-letter');

   textWrapper.addEventListener('mouseenter', () => {
      if (!tl.isActive() && !tl_2.isActive()) {
         firstLetters.forEach((letter, index) => {
            const delay = index * 40;
            letter.style.transitionDelay = `${delay}ms`;
            letter.style.transform = 'translateY(-110%)';
            secondLetters[index].style.transitionDelay = `${delay}ms`;
            secondLetters[index].style.transform = 'translateY(-110%)';
         });
      }
   });

   textWrapper.addEventListener('mouseleave', () => {
      if (!tl.isActive() && !tl_2.isActive()) {
         firstLetters.forEach((letter, index) => {
            const delay = index * 40;
            letter.style.transitionDelay = `${delay}ms`;
            letter.style.transform = 'translateY(0)';
            secondLetters[index].style.transitionDelay = `${delay}ms`;
            secondLetters[index].style.transform = 'translateY(0)';
         });
      }
   });
}

textWrappers.forEach(textWrapper => {
   synchronizeLetters(textWrapper);
});



//! Ball 
gsap.to(
   '.main-block__ball span',
   {
      scrollTrigger: {
         trigger: '.main-block__text',
         start: 'top center',
         end: 'bottom top',
         scrub: true,
      },
      scale: 0,
      opacity: 0
   }
);
//! Intro
const tl_3 = gsap.timeline({
   scrollTrigger: {
      trigger: '.intro',
      start: '-80% center',
      end: 'top center',
      scrub: 1,
   },
});
tl_3.to(
   '.intro__image',
   {
      scale: 1.3,
   }
).to(
   '.intro__image_vr_3',
   {
      x: '-55%',
      y: '55%'
   }
).to(
   '.intro__image_vr_2',
   {
      x: '25%',
      y: '25%'
   }, '<'
).to(
   '.intro__image_vr_1',
   {
      x: '-25%',
      y: '-25%'
   }, '<'
).to(
   '.intro__image_man',
   {
      scale: 1.5
   }, '<'
).to(
   '.intro__image_dust_1',
   {
      y: '-5%'
   }, '<'
).to(
   '.intro__image_dust_2',
   {
      x: '25%'
   }, '<'
).to(
   '.intro__image_dust_3',
   {
      x: '-55%'
   }, '<'
);
//! LEGACY
const tl_4 = gsap.timeline({
   scrollTrigger: {
      trigger: '.creations__title',
      start: 'center center',
      endTrigger: '.footer',
      end: 'bottom bottom',
      scrub: 5,
   },
});

tl_4.to(
   '.legacy__body',
   {
      x: '-30%'
   }
)

////! Appearing animation

//const appearing = gsap.timeline({
//   duration: 2,
//});

//appearing.from(
//   '.main-block__title span',
//   {
//      transform: 'translate3d(0, 70%, -90px) scale3d(1, 1, 1) rotateX(-92deg) skew(3deg, -12deg)',
//      transformStyle: 'preserve-3d',
//      opacity: 0,
//      duration: 1.5 
//   }, 0
//).from(
//   '.main-block__circle-image_1',
//   {
//      y: '50%',
//      opacity: 0,
//      duration: 1
//   }
//).from(
//   '.main-block__circle-image_2',
//   {
//      y: '-100%',
//      opacity: 0,
//      duration: 1
//   }, '<'
//).from(
//   '.main-block__circle-image_3',
//   {
//      x: '100%',
//      opacity: 0,
//      duration: 1
//   }, '<'
//).from(
//   ['.main-block__circle_1', '.main-block__circle_2'],
//   {
//      scale: 0,
//      opacity: 0,
//      duration: 1
//   }
//).from(
//   ['.main-block__grid', '.main-block__text'],
//   {
//      y: '50%',
//      opacity: 0,
//      duration: 1
//   }
//)
//! titles
const tl_5 = gsap.timeline(
   {
      scrollTrigger: {
         trigger: '.intro',
         start: 'top center',
      },
      
   }
);
tl_5 .from(
   '.intro__title',
   {
      transform: 'translate3d(0, 20%, -90px) scale3d(1, 1, 1) rotateX(-22deg) skew(3deg, -12deg)',
      transformStyle: 'preserve-3d',
      opacity: 0,
      duration: 1.5 
   }, 0
).from(
   '.intro__label',
   {
      x: '-50%',
      opacity: 0,
   }, '<0.5'
)
gsap.from(
   '.creations__title span',
   {
      scrollTrigger: {
         trigger: '.creations__title',
         start: '-80% center',
         end: 'bottom bottom',
      },
      transform: 'translate3d(0, 70%, -90px) scale3d(1, 1, 1) rotateX(-92deg) skew(3deg, -12deg)',
      transformStyle: 'preserve-3d',
      opacity: 0,
      duration: 1.5 
   }, 0
);