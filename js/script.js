import {navAnimation} from './modules/navModule.js';
import { CreateElements } from './modules/createModules.js';
const create=new CreateElements();
const displayReceipes=document.querySelector('#displayReceipes');
let meals
navAnimation();
// create.createMeal('pizza','images/logo.png');

async function getData(category){
    const dFrag = document.createDocumentFragment()
    const response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const apiMeals=await response.json();
    meals=apiMeals.meals;
    meals.forEach(meal => dFrag.append(create.createMeal(meal.strMeal,meal.strMealThumb))
    );
    displayReceipes.append(dFrag);
}

getData('Dessert');

// console.log();