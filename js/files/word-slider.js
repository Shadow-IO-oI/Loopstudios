const dataWordSliders = document.querySelectorAll('[data-word-slider]');

dataWordSliders.forEach(slider => {
   const firstWrapper = slider.querySelector('[data-word-wrapper]');
   const secondWrapper = slider.querySelectorAll('[data-word-wrapper]')[1];
   const additionalWrapper = slider.querySelector('[data-word-additional-wrapper]');

   if (firstWrapper && secondWrapper) {
      const isFirstWrapper = firstWrapper.hasAttribute('data-word-wrapper');

      firstWrapper.style.cssText = `
         display: flex;
         flex: none;
         margin-left: -3px;
         position: relative;
         overflow: hidden;
      `;

      secondWrapper.style.cssText = `
         display: flex;
         flex: none;
         margin-left: 1rem;
         position: relative;
         overflow: hidden;
      `;
      slider.addEventListener('mouseover', handleMouseOverOut);
      slider.addEventListener('mouseout', handleMouseOverOut);
   }
});

function handleMouseOverOut(event) {
   const slider = event.currentTarget;
   const translateX = event.type === 'mouseover' ? '100%' : '0%';

   const firstWrapper = slider.querySelector('[data-word-wrapper]');
   const secondWrapper = slider.querySelectorAll('[data-word-wrapper]')[1];

   if (firstWrapper && secondWrapper) {
      const elementsTranslateToRight = firstWrapper.querySelectorAll('*');
      const elementsTranslateToLeft = secondWrapper.querySelectorAll('*');

      elementsTranslateToRight.forEach(element => {
         element.style.cssText = `
            transition: all 0.45s ease 0s;
            transform: translateX(${translateX});
         `;
      });
      elementsTranslateToLeft.forEach(element => {
         element.style.cssText = `
            transition: all 0.45s ease 0s;
            transform: translateX(-${translateX});
         `;
      });
   }

   const additionalWrapperElements = slider.querySelectorAll('[data-word-additional-wrapper]');

   if (additionalWrapperElements) {
      const firstAdditionalWrapper = slider.querySelector('[data-word-additional-wrapper]');
      const secondAdditionalWrapper = slider.querySelectorAll('[data-word-additional-wrapper]')[1];

      if (firstAdditionalWrapper && secondAdditionalWrapper) {
         const additionalWrapperelementsTranslateToRight = firstAdditionalWrapper.querySelectorAll('*');
         const additionalWrapperelementsTranslateToLeft = secondAdditionalWrapper.querySelectorAll('*');

         additionalWrapperelementsTranslateToRight.forEach(element => {
            element.style.cssText = `
               transition: all 0.45s ease 0s;
               transform: translateX(${translateX});
            `;
         });
         additionalWrapperelementsTranslateToLeft.forEach(element => {
            element.style.cssText = `
               transition: all 0.45s ease 0s;
               transform: translateX(-${translateX});
            `;
         });
      }
   }
}
