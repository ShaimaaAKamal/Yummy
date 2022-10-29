

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
            general.hideSpinner();
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
                    general.hideSpinner();

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
                    general.hideSpinner();
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
            general.hideSpinner();
      
    }

async  getAreas(element){
        const dFrag = document.createDocumentFragment()
        const apiMealsAreas=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
            apiMealsAreas.meals.slice(0,20).forEach(area => dFrag.append(create.createArea(area.strArea))
            );
            await element.append(dFrag);
             general.hideSpinner();
    }

async  getIngredients(element){
        const dFrag = document.createDocumentFragment()
        const apiMealsIngredients=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
            apiMealsIngredients.meals.slice(0,20).forEach(ingredient => dFrag.append(create.createIngredient(ingredient))
            );
            await element.append(dFrag);
            general.hideSpinner();
       
     
    }
}