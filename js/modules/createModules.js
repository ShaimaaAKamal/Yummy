import { getData } from "./getData.js";
import { General } from "./generalModules.js";

const displayMeals=document.querySelector('#displayMeals');
const displayCategories=document.querySelector("#displayCategories");
const mealDetailsElement=document.querySelector("#mealDetails");
const displayAreas=document.querySelector("#displayAreas");
const noResults=document.querySelector('#noResults');
const displayIngredients=document.querySelector('#displayIngredients');
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
      const colDiv=this.createElement('div',{class:"col-lg-4 col-xl-3 col-md-6",id:cardid});
      colDiv.appendChild(Card);
      return colDiv ;
    }
    createMeal(mealName,mealImg,mealId)
    { self=this;
      const colDiv=this.createCard(mealName,'mealName',mealImg,'mealCard',mealId);
       colDiv.addEventListener('click',async function(){
        localStorage.setItem('section','singleMeal')
        const mealId=this.id;
        const response=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const mealDetails=response.meals[0];
        let mealIngredients=[];
        mealIngredients= getDataClass.getIngredients(mealDetails,mealIngredients)
        const firstChild=self.createMealDetails(mealDetails.strMeal,mealDetails.strMealThumb);
        const lastChild=self.createMealInstruction(mealDetails.strInstructions,mealDetails.strArea,mealDetails.strCategory,mealIngredients,mealDetails.strTags,mealDetails.strSource,mealDetails.strYoutube)
        mealDetailsElement.innerHTML=''
        mealDetailsElement.appendChild(firstChild);
        mealDetailsElement.appendChild(lastChild);
        general.showElements([mealDetailsElement]);
        general.hideElements([displayCategories,displayMeals,displayAreas,displayIngredients,noResults]);
      })
      return colDiv;
    }
    createCategory(categoryName,categoryDes,categoryImage,categoryId){
      const p=this.createElement('p',{class:'fw-semibold'},categoryDes);
      const self=this;
      const colDiv= this.createCard(categoryName,'categoryInfo',categoryImage,'categoryCard',categoryId,p);
       colDiv.addEventListener('click',async function(){
        self.createApiEvenet(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,displayCategories);
       })
      return colDiv ;
    }

    createArea(areaName){
      const parentDiv=this.createElement('div',{class:'col-md-6 col-lg-3'});
      const div =this.createElement('div',{class:'text-center'});
      const icon =this.createElement('i',{class:'fa-solid fa-city fa-3x areaColor'});
      const area=this.createElement('h2',{class:'mt-2'},areaName);
      const self=this;
      div.appendChild(icon);
      div.appendChild(area);
      parentDiv.appendChild(div);
      parentDiv.addEventListener('click',async function(){
        self.createApiEvenet(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`,displayAreas)
      })
      return parentDiv;
    }


    createIngredient(ingredient){
      let ingredientDesc=(ingredient.strDescription)?ingredient.strDescription.split(' ').slice(0,20).join(' '):"";           
      const parentDiv=this.createElement('div',{class:'col-md-6 col-lg-3'});
      const div =this.createElement('div',{class:'text-center'});
      const icon =this.createElement('i',{class:'fa-solid fa-bowl-food ingredientIcon fa-3x'});
      const ingedientName=this.createElement('h2',{class:'mt-2'},ingredient.strIngredient);
      const ingedrentInfo =this.createElement('p',{class:'px-2'},ingredientDesc);
      div.appendChild(icon);
      div.appendChild(ingedientName);
      div.appendChild(ingedrentInfo);
      parentDiv.appendChild(div);

      parentDiv.addEventListener('click',async function(){
        self.createApiEvenet(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.strIngredient}`,displayIngredients);
      })
      return parentDiv;
    }
    
    

   async createApiEvenet(url,showElement){
    let apiMeals= await getDataClass.getDatafun(url);
    general.showElements([displayMeals]);
    general.hideElements([showElement]);
    displayMeals.innerHTML='';
    this.getMeals(apiMeals);
   }
   
 

    async createMealsCards(apiMeals){
      const dFrag = document.createDocumentFragment();
      if(apiMeals){
          apiMeals.forEach(meal =>{dFrag.append(this.createMeal(meal.strMeal,meal.strMealThumb,meal.idMeal))});
          await  displayMeals.append(dFrag);
      }
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
      const Receipes=this.createIngredientsSec(mealIngredients);
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
    createIngredientsSec(mealIngredients){
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

   
    createPagnation(noPages,element,apiMealsAreas,noOfLastPageElements,key,activePage=0){
      const nav= this.createElement('nav',{class:'mt-5 navPagnation'});
      const ul=this.createElement('ul',{class:'pagination justify-content-center'});
      const previousDisabled=(activePage === 0) ? 'disabled':'';
      const previousli= this.createElement('li',{class:`page-item ${previousDisabled}`});
      const previouslink=this.createElement('a',{class:'page-link',href:'#'},`Previous`);
      let x=0;
      previousli.appendChild(previouslink);
      ul.appendChild(previousli);
      // for(let i=0 ; i<noPages ; i++){
        for(let i=0 ; i<2 ; i++){
          ul.appendChild(this.createPagnationLink(i,element,apiMealsAreas,noPages,noOfLastPageElements,x,key,activePage));
          x+=20; 
      }
      const nextDisabled=(activePage === noPages-1) ? 'disabled':'';
      const nextli= this.createElement('li',{class:`page-item ${nextDisabled}`});
      const nextlink=this.createElement('a',{class:'page-link',href:'#'},'Next');
      nextli.addEventListener('click',function(){
        self.handleNextPage(noPages,key,apiMealsAreas,noOfLastPageElements,element)
      })
      nextli.appendChild(nextlink);
      ul.appendChild(nextli)
      nav.appendChild(ul);
      return nav;
  }

  handleNextPage(noPages,linkKey,apiMealsAreas,noOfLastPageElements,element){
     const allPages=Array.from(document.querySelectorAll('.pages'));
      const activeElementIndex=self.getActivePage(allPages);
       const nextItemIndex =Number(activeElementIndex)+1;
       const x=nextItemIndex*20;
    //   if(noPages-1 >= nextItemIndex ) {
    //   allPages[activeElementIndex].classList.remove('active')
    //   allPages[nextItemIndex].classList.add('active');
    //   previousli.classList.remove('disabled');
    //   if(noPages-1 === nextItemIndex)  nextli.classList.add('disabled');
    //   }
    element.innerHTML=''
    let dFrag=self.pagnationKey(linkKey,apiMealsAreas,noOfLastPageElements,nextItemIndex,noPages,x);
   const nav=self.createPagnation(noPages,element,apiMealsAreas,noOfLastPageElements,linkKey,nextItemIndex)
   if(linkKey !== 'meals'){ element.append(dFrag);} 
   element.appendChild(nav); 
  }
 
  
  createPagnationLink(i,element,apiMealsAreas,noPages,noOfLastPageElements,x,linkKey,activePage){
    const active=(i === activePage)?'active':'';
     const li= this.createElement('li',{class:`page-item ${active} pages`,id:i});
     const link=this.createElement('a',{class:`page-link ${linkKey}`,href:'#'},i+1);
     li.appendChild(link);
     self=this
     link.addEventListener('click',function(e){
         element.innerHTML=''
          let dFrag=self.pagnationKey(linkKey,apiMealsAreas,noOfLastPageElements,i,noPages,x);
         const nav=self.createPagnation(noPages,element,apiMealsAreas,noOfLastPageElements,linkKey,i)
         if(linkKey !== 'meals'){ element.append(dFrag);} 
         element.appendChild(nav);     
     })
     return li;
  }

   getActivePage(allPages){
    let previousActivePage=allPages.find(page => page.classList.contains('active'));
    return previousActivePage.id;
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
  pagnationKey(linkKey,apiMeals,noOfLastPageElements,i,noPages,x){
    const dFrag = document.createDocumentFragment();
    let key=this.getKey(linkKey);
   
    let noElements=(i === noPages-1)?noOfLastPageElements:20;
    switch(key){
      case 'area':
        apiMeals.meals.slice(x,x+noElements).forEach(area => dFrag.append(this.createArea(area.strArea)));
        break;
      case 'category':
        apiMeals.categories.slice(x,x+noElements).forEach(category =>  dFrag.append(this.createCategory(category.strCategory,category.strCategoryDescription,category.strCategoryThumb,category.idCategory)));
        break;
      case 'ingredient':
        apiMeals.meals.slice(x,x+noElements).forEach(ingredient => dFrag.append(this.createIngredient(ingredient)));
        break;
        case 'meals':
           this.createMealsCards(apiMeals.meals.slice(x,x+noElements));  
          break;
      default : break;
  }
  
  return dFrag;

}

  async getMeals(apiMeals){
  const {noPages,noOfLastPageElements}=general.getPagesCount(apiMeals.meals.length);
  if(noPages ===0){console.log('no meals')}
  else if(noPages === 1) { await this.createMealsCards(apiMeals.meals.slice(0,noOfLastPageElements));     
  }
  else{
       await this.createMealsCards(apiMeals.meals.slice(0,20));
       let  element=document.querySelector('#displayMeals');  
       const nav=this.createPagnation(noPages,element,apiMeals,noOfLastPageElements,'meals',0)
       element.appendChild(nav);
            
  }
   }

}