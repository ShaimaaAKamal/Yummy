

import { CreateElements } from "./createModules.js"; 
import { getData } from "./getData.js";
const create=new CreateElements();
const getDataClass=new getData();

export class displayData {
    
 async  getMealsByCategory(category){
        const apiMeals=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        create.createMealsCards(apiMeals);
    }

 async  getMealsByName(searchKey){
         const noResults=document.querySelector('#noResults');
        if(searchKey){
            const apiMeals=await getDataClass.getDatafun(`https://themealdb.com/api/json/v1/1/search.php?s=${searchKey}`);
        if(apiMeals.meals)
        {  $('#displayMeals').removeClass('d-none');
           noResults.classList.add('d-none');
           create.createMealsCards(apiMeals);}
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

    async  getCategories(element){
        const dFrag = document.createDocumentFragment()
        const apiMeals=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        apiMeals.categories.forEach(category => dFrag.append(create.createCategory(category.strCategory,category.strCategoryDescription,category.strCategoryThumb,category.idCategory))
        );
        element.append(dFrag);
    }

    async  getAreas(element){
        const dFrag = document.createDocumentFragment()
        const apiMealsAreas=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        apiMealsAreas.meals.forEach(area => dFrag.append(create.createArea(area.strArea))
        );
        element.append(dFrag);
    }

    async  getIngredients(element){
        const dFrag = document.createDocumentFragment()
        const apiMealsIngredients=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        apiMealsIngredients.meals.slice(0,20).forEach(ingredient => dFrag.append(create.createIngredient(ingredient))
        );
        element.append(dFrag);
    }
}