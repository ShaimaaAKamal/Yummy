
const spinParent=document.querySelector('.spinParent')
const contentParent=document.querySelector('.contentParent');
const main=document.querySelector('.main');
let page =0; 
let remaining;

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
      this.showElements([contentParent,main]);
   }


    getPages(num){
      if(num >= 20){
          page++;
          num=num-20;
          remaining=num;
          this.getPages(num)
      }
      else{
         remaining=num;
      }
       return {page,remaining}
  }
  
  getPagesCount(num){
    page=0;
    let obj=this.getPages(num);
    if(obj.remaining > 0)
     obj.page=obj.page + 1;
     return {noPages:obj.page,noOfLastPageElements:obj.remaining}
  }
   
  setNext(nextItemIndex,activeElementIndex,noPages,elementUlChildren,nextli,previousli){
   if(noPages >= nextItemIndex ) {
     elementUlChildren[activeElementIndex].classList.remove('active')
     elementUlChildren[nextItemIndex].classList.add('active');
     previousli.classList.remove('disabled');
   if(noPages === nextItemIndex)  nextli.classList.add('disabled');
   }  
   return elementUlChildren;


 }

setPrevious(previousItemIndex,activeElementIndex,noPages,elementUlChildren,nextli,previousli){
   if(noPages >= activeElementIndex && activeElementIndex >=1 ) {
     elementUlChildren[activeElementIndex].classList.remove('active')
     elementUlChildren[previousItemIndex].classList.add('active');
     nextli.classList.remove('disabled');
   if(activeElementIndex === 2)  previousli.classList.add('disabled');
     }
     return elementUlChildren;
       }

 getKey(linkKey){
         let key;
         switch(linkKey){
           case 'area': key='area';break;
           case 'category': key='category';break;
           case 'ingredient': key='ingredient';break;
           case 'meals': key='meals';break;
           default : break;
         }
         return key;
       }


}