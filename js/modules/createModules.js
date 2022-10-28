import { getData } from "./getData.js";
import { General } from "./generalModules.js";

const displayMeals=document.querySelector('#displayMeals');
const displayCategories=document.querySelector("#displayCategories");
let getDataClass=new getData();
const general =new General();

export class CreateElements{

     createElement(element,attributes,text=''){
        const elemName=document.createElement(element);
        if(Object.keys(attributes).length !== 0)
             this.setAttr(elemName,attributes);
        if(text)
           this.addInnerText(elemName,text)
        return elemName;
    }
    
     setAttr(element,attributes){
       Object.keys(attributes).forEach(key => 
        element.setAttribute(key,attributes[key]));
    }
    
     addInnerText(element,text){
        element.append(text);
     }
    
     createMeal(mealName,mealImg,mealId)
    {
      const colDiv=this.createCard(mealName,'mealName',mealImg,'mealCard',mealId);
      colDiv.addEventListener('click',async function(){
        const mealId=this.id;
        const response=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const mealDetails=response.meals[0]
          console.log(mealDetails);
      })
      return colDiv;
    }

    createCategory(categoryName,categoryDes,categoryImage,categoryId){
      const p=this.createElement('p',{class:'fw-semibold'},categoryDes);
      const self=this;
      const colDiv= this.createCard(categoryName,'categoryInfo',categoryImage,'categoryCard',categoryId,p);
       colDiv.addEventListener('click',async function(){
      const category=this.children[0].children[0].alt;
        let apiMeals= await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        general.showElements([displayMeals]);
        general.hideElements([displayCategories]);
        displayMeals.innerHTML=''
        self.createMealsCards(apiMeals);
       })
      return colDiv ;
    }

    createCard(name,className,imgcard,cardClassName,cardid,...Rest){
      const h2=this.createElement('h2',{class:'text-center'},name);
      const div=this.createElement('div',{class:`${className} rounded-3`});
      div.appendChild(h2);
      if(Rest.length !== 0)
       div.appendChild(Rest[0]);
      const img=this.createElement('img',{src:imgcard,alt:name,class:'w-100 rounded-3'});
      const Card=this.createElement('div',{class:`position-relative ${cardClassName}`});
      Card.appendChild(img)
      Card.appendChild(div);
      const colDiv=this.createElement('div',{class:"col-lg-3 col-md-6",id:cardid});
      colDiv.appendChild(Card);
      return colDiv ;
    }

    createMealsCards(apiMeals){
      const dFrag = document.createDocumentFragment();
      apiMeals.meals.forEach(meal =>{dFrag.append(this.createMeal(meal.strMeal,meal.strMealThumb,meal.idMeal))});
      displayMeals.append(dFrag);
    }    
}