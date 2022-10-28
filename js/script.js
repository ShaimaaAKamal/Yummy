import {navAnimation} from './modules/navModule.js';
import { displayData } from './modules/displayData.js';
import { General } from './modules/generalModules.js';


const displayDataClass=new displayData();
const general=new General();
const displayMeals=document.querySelector('#displayMeals');
const displayCategories=document.querySelector("#displayCategories");
const displayAreas=document.querySelector("#displayAreas");
const displayIngredients=document.querySelector('#displayIngredients');
const mealDetails=document.querySelector('#mealDetails');

const mainNav=document.querySelector('.mainNav');
const menuIcon=document.querySelector('#menuIcon');
const closeMenuIcon=document.querySelector('#closeMenuIcon');

navAnimation();
displayDataClass.getMealsByCategory('chicken',displayMeals);

$("#categoriesLink").click(function(e){
    e.preventDefault();
    general.hideElements([displayMeals,closeMenuIcon,mealDetails,displayAreas,displayIngredients]);
    $('.mainNav').css({'width':'0px','opacity':'0'}).removeClass('ps-4 pe-1');
    general.showElements([displayCategories,menuIcon]);
    displayDataClass.getCategories(displayCategories);
})

$("#areaLink").click(function(e){
    e.preventDefault();
    $('.mainNav').css({'width':'0px','opacity':'0'}).removeClass('ps-4 pe-1');
    general.hideElements([displayMeals,closeMenuIcon,displayCategories,mealDetails,displayIngredients]);
    general.showElements([displayAreas,menuIcon]);
    displayDataClass.getAreas(displayAreas);
})

$("#ingredientsLink").click(function(e){
    e.preventDefault();
    $('.mainNav').css({'width':'0px','opacity':'0'}).removeClass('ps-4 pe-1');
    // const ingredientDesc=document.querySelector('.ingredientDesc');
    // console.log(ingredientDesc.innerText.split(' ').slice(0,20).join(' '));
    general.hideElements([displayMeals,closeMenuIcon,displayCategories,mealDetails,displayAreas]);
    general.showElements([displayIngredients,menuIcon]);
    displayDataClass.getIngredients(displayIngredients);
})


