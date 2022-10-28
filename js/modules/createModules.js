import { getData } from "./getData.js";
import { General } from "./generalModules.js";

const displayMeals=document.querySelector('#displayMeals');
const displayCategories=document.querySelector("#displayCategories");
const mealDetailsElement=document.querySelector("#mealDetails");
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

    createMeal(mealName,mealImg,mealId)
    { self=this;
      const colDiv=this.createCard(mealName,'mealName',mealImg,'mealCard',mealId);
      colDiv.addEventListener('click',async function(){
        const mealId=this.id;
        const mealPage=document.querySelector('.mealDetails');
        const response=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const mealDetails=response.meals[0];
        let mealIngredients=[];
        mealIngredients= getDataClass.getIngredients(mealDetails,mealIngredients)
        const firstChild=self.createMealDetails(mealDetails.strMeal,mealDetails.strMealThumb);
        const lastChild=self.createMealInstruction(mealDetails.strInstructions,mealDetails.strArea,mealDetails.strCategory,mealIngredients,mealDetails.strTags,mealDetails.strSource,mealDetails.strYoutube)
        mealDetailsElement.appendChild(firstChild);
        mealDetailsElement.appendChild(lastChild);
        mealPage.appendChild(mealDetailsElement);
        general.showElements([mealPage]);
        general.hideElements([displayCategories,displayMeals]);
        console.log(mealDetailsElement);
      })
      return colDiv;
    }

    createMealDetails(mealName,mealImg){
      const div=this.createElement('div',{class:'col-md-3 col-xl-4'});
      const img=this.createElement('img',{class:'w-100 rounded-3',alt:mealName,src:mealImg});
      const h2=this.createElement('h2',{class:'text-center mt-2'},mealName);
      div.appendChild(img);
      div.appendChild(h2);
      return div;
       }
   
    createMealInstruction(mealDes,mealArea,mealCategory,mealIngredients,tagName,sourceLink,youtubeLink){
     const div=this.createElement('div',{class:'col-xl-8 col-md-9 pb-4'});
      const h2Instruction=this.createElement('h2',{},'Instructions');
      const pDesc=this.createElement('p',{},mealDes);
      const area=this.createMealSubHeading(`Area : `,mealArea);
      const category=this.createMealSubHeading(`Category : `,mealCategory);
      const h2Rece=this.createElement('h2',{},'Receipes :');
      const Receipes=this.createIngredients(mealIngredients);
      const h2Tags=this.createElement('h2',{},'Tags :');
      const elements=[h2Instruction,pDesc,area,category,h2Rece,Receipes,h2Tags];
      if(tagName){
        const tags=this.createTags(tagName);
        elements.push(tags);
      }
      const   source=this.createSources(sourceLink,youtubeLink);   
      elements.push(source);   
      elements.forEach(element => div.appendChild(element));
      return div;
    }

    createMealSubHeading(subHead,mealInfo){
      const p=this.createElement('p',{});
      const spanFirst=this.createElement('span',{class:'fw-bold'},subHead);
      const spanLast=this.createElement('span',{},mealInfo);
      p.appendChild(spanFirst);
      p.appendChild(spanLast);
      return p;
    }
    createIngredients(mealIngredients){
      const div=this.createElement('div',{class:'py-3'});
      mealIngredients.forEach((ingredient )=> {
        const span=this.createElement('span',{class:'alert alert-success py-2 mb-4 d-inline-block me-2'},ingredient);
         div.appendChild(span);
      })
      return div;
    }
    createTags(tagName){
      const tags=tagName.split(',');
      const div=this.createElement('div',{class:'py-3'});
      tags.forEach(tag=> {
      const span=this.createElement('span',{class:'alert alert-danger py-2 me-2'},tag);
      div.appendChild(span);
      })
      return div;
    }
    createSources(sourceLink,youtubeLink){
      let sourceHref,youHref;
      const div=this.createElement('div',{class:'mt-4'});
      sourceHref=(sourceLink)?sourceLink:'#';
      youHref=(youtubeLink)?youtubeLink:'#';
      const source=this.createElement('a',{class:'btn btn-success me-2',href:sourceHref},'Source');
      const Youtube=this.createElement('a',{class:'btn btn-danger',href:youHref},'Youtub');
      div.appendChild(source);
      div.appendChild(Youtube);
      return div;
    }

}