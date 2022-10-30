

import { CreateElements } from "./createModules.js"; 
import { General } from "./generalModules.js";
import { getData } from "./getData.js";
const create=new CreateElements();
const general=new General();
const getDataClass=new getData();


export class displayData {
    
 async  getMealsByCategory(category){
            const apiMeals=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            create.getMeals(apiMeals);
    }

 async  getMealsByName(searchKey){
  
        $('#displayMeals').html('');
         const noResults=document.querySelector('#noResults');
        if(searchKey){
            const apiMeals=await getDataClass.getDatafun(`https://themealdb.com/api/json/v1/1/search.php?s=${searchKey}`);
                if(apiMeals.meals)
                {    
                    $('#displayMeals').removeClass('d-none');
                   noResults.classList.add('d-none');
                   create.getMeals(apiMeals);
                }
                else
                   { noResults.classList.remove('d-none');
                    $('#displayMeals').html('');
                     noResults.innerHTML=`Found 0 results for ${searchKey}`
                    }

        }
        else{
            $('#displayMeals').removeClass('d-none');
            noResults.classList.add('d-none');
            this.getMealsByCategory('Chicken');
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
                     create.getMeals(apiMeals);

                }
                else{
                     if(section === 'singleMeal')
                      $('#mealDetails').removeClass('d-none');
                      else $('#displayMeals').removeClass('d-none');
                    }
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
        const {noPages,noOfLastPageElements}=general.getPagesCount(apiMeals.categories.length);
        if(noPages ===0){console.log('no categories')}
         else if(noPages === 1) {
             apiMeals.categories.slice(0,noOfLastPageElements).forEach(category => dFrag.append(create.createCategory(category.strCategory,category.strCategoryDescription,category.strCategoryThumb,category.idCategory)));
             await element.append(dFrag);
            }
         else{
              apiMeals.categories.slice(0,20).forEach(category =>  dFrag.append(create.createCategory(category.strCategory,category.strCategoryDescription,category.strCategoryThumb,category.idCategory)))
              const nav=create.createPagnation(noPages,element,apiMeals,noOfLastPageElements,'category',0)
              await element.append(dFrag);
              element.appendChild(nav);     
         }
      
    }

async  getAreas(element){
    const dFrag = document.createDocumentFragment();
      if(element.nextElementSibling) element.nextElementSibling.remove();
    const apiMealsAreas=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const {noPages,noOfLastPageElements}=general.getPagesCount(apiMealsAreas.meals.length);

        if(noPages ===0){console.log('no areas')}
         else if(noPages === 1) { apiMealsAreas.meals.slice(0,noOfLastPageElements).forEach(area => dFrag.append(create.createArea(area.strArea)));     
                    await element.append(dFrag);
         }
         else{
             apiMealsAreas.meals.slice(0,20).forEach(area => dFrag.append(create.createArea(area.strArea))
              );
              const nav=create.createPagnation(noPages,element,apiMealsAreas,noOfLastPageElements,'area',0)
              await element.append(dFrag);
              element.appendChild(nav);     
         }
}

async  getIngredients(element){
        const dFrag = document.createDocumentFragment()
        const apiMealsIngredients=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        const {noPages,noOfLastPageElements}=general.getPagesCount(apiMealsIngredients.meals.length);
        if(noPages ===0){console.log('no ingredients')}
         else if(noPages === 1) { apiMealsIngredients.meals.slice(0,noOfLastPageElements).forEach(ingredient => dFrag.append(create.createIngredient(ingredient))) ;
            await element.append(dFrag);
        }
         else{
              apiMealsIngredients.meals.slice(0,20).forEach(ingredient => dFrag.append(create.createIngredient(ingredient)));
              const nav=create.createPagnation(noPages,element,apiMealsIngredients,noOfLastPageElements,'ingredient',0)
              await element.append(dFrag);
              element.appendChild(nav);    
         }

    }
}