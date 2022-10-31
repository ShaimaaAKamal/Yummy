
import { General } from "./generalModules.js";
const general =new General();
export class getData{

    async  getDatafun(url){
        try{
          general.showSpinner();
          const response=await fetch(url);
          const apiMeals=await response.json();
          if(apiMeals){general.hideSpinner();return apiMeals}; 
        }
        catch(e){
           general.showSpinner();
        }
       }

    
    getIngredients(mealDetails,mealIngredients){
        for(let i=1 ;i<=20 ; i++){
          if(mealDetails[`strIngredient${i}`] && mealDetails[`strIngredient${i}`] !== ' ')
           {let ingred;
             if(mealDetails[`strMeasure${i}`] && mealDetails[`strMeasure${i}`] !== ' ')
                 ingred=`${mealDetails[`strMeasure${i}`]} ${mealDetails[`strIngredient${i}`]}`;
             else
              ingred=mealDetails[`strIngredient${i}`];
             mealIngredients.push(ingred);
           }
        }
        return mealIngredients;
      }

    getActivePage(element){
        const {elementUlChildren,elementPagnation}=this.getPagnationElement(element);
        let previousActivePage=elementUlChildren.find(page => page.classList.contains('active'));
        if(previousActivePage !== undefined)
        return {activeElementIndex:Number(previousActivePage.id)+1,elementUlChildren,elementPagnation};
        else 
        return false;
      }
      
      getPagnationElement(element){
        const elementPagnation=Array.from(element.children).pop();
        const  elementUl  =elementPagnation.children[0];
        const  elementUlChildren  =Array.from(elementUl.children);
        return {elementUlChildren,elementPagnation};
      }
   
      
    
}