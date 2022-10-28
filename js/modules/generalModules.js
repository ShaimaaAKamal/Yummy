export class General{
     showElements(elements) {
         elements.forEach(element => {
            element.classList.remove(`d-none`);
         });
    }
    hideElements(elements) {
        elements.forEach(element => {
           element.classList.add(`d-none`);
        });
   }
}