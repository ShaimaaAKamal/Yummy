const spinParent=document.querySelector('.spinParent')
const contentParent=document.querySelector('.contentParent');
const main=document.querySelector('.main');

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
      const section=(localStorage.getItem('section'))?localStorage.getItem('section'):'home';
      if(section==='home')
         {        
         spinParent.classList.add('w-100');
         spinParent.classList.remove('spinWidth');
         this.hideElements([contentParent]);
         this.showElements([spinParent,main]);}
      else{
         spinParent.classList.add('spinWidth');
         spinParent.classList.remove('w-100');
         this.hideElements([main])
         this.showElements([spinParent,contentParent]);
      }
   }
   hideSpinner(){
      this.hideElements([spinParent]);
      this.showElements([contentParent]);
   }
}