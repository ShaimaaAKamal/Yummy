const spinParent=document.querySelector('.spinParent')
const contentParent=document.querySelector('.contentParent');

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
   showSpinner(){
      this.hideElements([contentParent]);
      this.showElements([spinParent]);
   }
   hideSpinner(){
      this.hideElements([spinParent]);
      this.showElements([contentParent]);
   }
}