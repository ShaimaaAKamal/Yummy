import { getData } from "./getData.js";
const displayMeals=document.querySelector('#displayMeals');
const displayCategories=document.querySelector("#displayCategories");
let getDataClass=new getData();
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
    
     createMeal(mealName,mealImg)
    {
      return this.createCard(mealName,'mealName',mealImg,'mealCard')
    }

    createCategory(categoryName,categoryDes,categoryImage){
      const p=this.createElement('p',{class:'fw-semibold'},categoryDes);
      const colDiv= this.createCard(categoryName,'categoryInfo',categoryImage,'categoryCard',p);
       colDiv.addEventListener('click',async function(){
         const category=this.children[0].children[0].alt;
         console.log(await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`));
       })
      return colDiv ;


    }

    createCard(name,className,imgcard,cardClassName,...Rest){
      const h2=this.createElement('h2',{class:'text-center'},name);
      const div=this.createElement('div',{class:`${className} rounded-3`});
      div.appendChild(h2);
      if(Rest.length !== 0)
       div.appendChild(Rest[0]);
      const img=this.createElement('img',{src:imgcard,alt:name,class:'w-100 rounded-3'});
      const Card=this.createElement('div',{class:`position-relative ${cardClassName}`});
      Card.appendChild(img)
      Card.appendChild(div);
      const colDiv=this.createElement('div',{class:"col-lg-3 col-md-6"});
      colDiv.appendChild(Card);
      return colDiv ;
    }
    
}