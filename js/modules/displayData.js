

import { CreateElements } from "./createModules.js"; 
import { General } from "./generalModules.js";
import { getData } from "./getData.js";
const create=new CreateElements();
const general=new General();
const getDataClass=new getData();

let searchMeals;

export class displayData {
    
 async  getMealsByCategory(category){
            const apiMeals=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            await create.createMealsCards(apiMeals); 
            searchMeals=apiMeals;
            //general.hideSpinner();
    }

 async  getMealsByName(searchKey){
  
        $('#displayMeals').html('');
         const noResults=document.querySelector('#noResults');
        if(searchKey){
            const apiMeals=await getDataClass.getDatafun(`https://themealdb.com/api/json/v1/1/search.php?s=${searchKey}`);
                if(apiMeals.meals)
                {  $('#displayMeals').removeClass('d-none');
                   noResults.classList.add('d-none');
                 await  create.createMealsCards(apiMeals);
                   localStorage.setItem('meals',JSON.stringify(apiMeals));
                }
                else
                   { noResults.classList.remove('d-none');
                    $('#displayMeals').html('');
                     noResults.innerHTML=`Found 0 results for ${searchKey}`
                    }
                    //general.hideSpinner();

        }
        else{
            $('#displayMeals').removeClass('d-none');
            noResults.classList.add('d-none');
            this.getMealsByCategory('Chicken');
            localStorage.setItem('meals',JSON.stringify(searchMeals));
        }
        
    }

async  getMealsByletter(searchKey){
        const lengthError=document.querySelector('#lengthError');
        const section=localStorage.getItem('section');
        if(searchKey.length <= 1)
         {  lengthError.classList.add('d-none');
            if(searchKey){
                const apiMeals=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchKey}`);
                
                if(apiMeals.meals)
                { 
                   $('#displayMeals').html('').removeClass('d-none');
                   await create.createMealsCards(apiMeals);
                }
                else{
                     if(section === 'singleMeal')
                      $('#mealDetails').removeClass('d-none');
                      else $('#displayMeals').removeClass('d-none');
                    }
                    //general.hideSpinner();
            }
            else{
                if(section === 'singleMeal')
                $('#mealDetails').removeClass('d-none');
                else $('#displayMeals').removeClass('d-none');
            }}
            else{lengthError.classList.remove('d-none');}
    
         }


async  getCategories(element){
        const dFrag = document.createDocumentFragment()
        const apiMeals=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/categories.php`);
            apiMeals.categories.forEach(category => dFrag.append(create.createCategory(category.strCategory,category.strCategoryDescription,category.strCategoryThumb,category.idCategory))
            );
            await element.append(dFrag);
            //general.hideSpinner();
      
    }

async  getAreas(element){
    const dFrag = document.createDocumentFragment();
    const displayParent=document.querySelector('.displayAreas');
      if(element.nextElementSibling) element.nextElementSibling.remove();
    const apiMealsAreas=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const {noPages,noOfLastPageElements}=general.getPagesCount(apiMealsAreas.meals.length);

        if(noPages ===0){console.log('no areas')}
         else if(noPages === 1) { apiMealsAreas.meals.slice(0,noOfLastPageElements-1).forEach(area => dFrag.append(create.createArea(area.strArea))) }
         else{
             apiMealsAreas.meals.slice(0,20).forEach(area => dFrag.append(create.createArea(area.strArea))
              );
              const nav=create.createPagnation(noPages,element,apiMealsAreas,noOfLastPageElements)
              await element.append(dFrag);
              element.appendChild(nav);     
         }
}

// createPagnation(noPages,element,apiMealsAreas,noOfLastPageElements){
//     const nav= create.createElement('nav',{class:'mt-5'});
//     const ul=create.createElement('ul',{class:'pagination justify-content-center'});
//     const previousli= create.createElement('li',{class:'page-item disabled'});
//     const previouslink=create.createElement('a',{class:'page-link',href:'#'},`Previous` );
//     let x=0;
//     previousli.appendChild(previouslink);
//     ul.appendChild(previousli);
//     for(let i=0 ; i<noPages ; i++){
//         ul.appendChild(this.createPagnationLink(i,element,apiMealsAreas,noPages,noOfLastPageElements,x));
//         x+=20; 
//     }
//     const nextli= create.createElement('li',{class:'page-item disabled'});
//     const nextlink=create.createElement('a',{class:'page-link',href:'#'},'Next');
//     nextli.appendChild(nextlink);
//     ul.appendChild(nextli)
//     nav.appendChild(ul);
//     return nav;
// }


// createPagnationLink(i,element,apiMealsAreas,noPages,noOfLastPageElements,x){
//    const li= create.createElement('li',{class:'page-item'});
//    const link=create.createElement('a',{class:'page-link',href:'#',id:`page${i}`},i+1);
//    li.appendChild(link);
//    self=this
//    li.addEventListener('click',function(e){
//        element.innerHTML=''
//        const dFrag = document.createDocumentFragment();
//        if(i === noPages-1)
//       { apiMealsAreas.meals.slice(x,x+noOfLastPageElements).forEach(area => dFrag.append(create.createArea(area.strArea)));}
//        else{
//         apiMealsAreas.meals.slice(x,x+20).forEach(area => dFrag.append(create.createArea(area.strArea)));
//        }
//        const nav=self.createPagnation(noPages,element,apiMealsAreas,noOfLastPageElements)
//        element.append(dFrag);
//        element.appendChild(nav);     

//    })
//    return li;
// }

async  getIngredients(element){
        const dFrag = document.createDocumentFragment()
        const apiMealsIngredients=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
            apiMealsIngredients.meals.slice(0,20).forEach(ingredient => dFrag.append(create.createIngredient(ingredient))
            );
            await element.append(dFrag);
            //general.hideSpinner();
       
     
    }
}