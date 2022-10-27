

import { CreateElements } from "./createModules.js"; 
import { getData } from "./getData.js";
const create=new CreateElements();
const getDataClass=new getData();

export class displayData {
 async  getMealsByCategory(category,element){
        const dFrag = document.createDocumentFragment()
        const apiMeals=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        apiMeals.meals.forEach(meal => dFrag.append(create.createMeal(meal.strMeal,meal.strMealThumb))
        );
        element.append(dFrag);
    }

    async  getCategories(element){
        const dFrag = document.createDocumentFragment()
        const apiMeals=await getDataClass.getDatafun(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        apiMeals.categories.forEach(category => dFrag.append(create.createCategory(category.strCategory,category.strCategoryDescription,category.strCategoryThumb))
        );
        element.append(dFrag);
    }
}