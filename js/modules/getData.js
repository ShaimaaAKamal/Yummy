import { CreateElements } from "./createModules.js";
const create=new CreateElements();


export class getData{

    async  getMealsByCategory(category,element){
        const dFrag = document.createDocumentFragment()
        const response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const apiMeals=await response.json();
        apiMeals.meals.forEach(meal => dFrag.append(create.createMeal(meal.strMeal,meal.strMealThumb))
        );
        element.append(dFrag);
    }
    async  getCategories(element){
        const dFrag = document.createDocumentFragment()
        const response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        const apiMeals=await response.json();
        apiMeals.categories.forEach(category => dFrag.append(create.createCategory(category.strCategory,category.strCategoryDescription,category.strCategoryThumb))
        );
        element.append(dFrag);
    }
    
}