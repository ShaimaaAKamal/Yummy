import {navAnimation} from './modules/navModule.js';
import { getData } from './modules/getData.js';
// import { CreateElements } from './modules/createModules.js';

const getDataClass=new getData();
const displayMeals=document.querySelector('#displayMeals');
const displayCategories=document.querySelector("#displayCategories");

navAnimation();
getDataClass.getMealsByCategory('chicken',displayMeals);


// async function getMealsByCategory(category){
//     const dFrag = document.createDocumentFragment()
//     const response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
//     const apiMeals=await response.json();
//     apiMeals.meals.forEach(meal => dFrag.append(create.createMeal(meal.strMeal,meal.strMealThumb))
//     );
//     displayMeals.append(dFrag);
// }
// async function getCategories(){
//     const dFrag = document.createDocumentFragment()
//     const response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
//     const apiMeals=await response.json();
//     apiMeals.categories.forEach(category => dFrag.append(create.createCategory(category.strCategory,category.strCategoryDescription,category.strCategoryThumb))
//     );
//     displayCategories.append(dFrag);
// }


$("#categoriesLink").click(function(e){
    e.preventDefault();
    displayMeals.classList.add('d-none');
    displayCategories.classList.remove('d-none');
    $('.mainNav').addClass('d-none');
    $('#menuIcon').removeClass('d-none');
    $('#closeMenuIcon').addClass('d-none');
    getDataClass.getCategories(displayCategories);
})