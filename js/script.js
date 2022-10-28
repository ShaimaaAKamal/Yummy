import {navAnimation} from './modules/navModule.js';
import { displayData } from './modules/displayData.js';
import { General } from './modules/generalModules.js';


const displayDataClass=new displayData();
const general=new General();
const displayMeals=document.querySelector('#displayMeals');
const noResults=document.querySelector('#noResults');
const displayCategories=document.querySelector("#displayCategories");
const displayAreas=document.querySelector("#displayAreas");
const displayIngredients=document.querySelector('#displayIngredients');
const search=document.querySelector('.search');
const mealDetails=document.querySelector('#mealDetails');
const menuIcon=document.querySelector('#menuIcon');
const closeMenuIcon=document.querySelector('#closeMenuIcon');

navAnimation();
displayDataClass.getMealsByCategory('chicken',displayMeals);

$("#categoriesLink").click(function(e){
    e.preventDefault();
    general.hideElements([displayMeals,closeMenuIcon,mealDetails,displayAreas,displayIngredients,search,noResults]);
    $('.mainNav').css({'width':'0px','opacity':'0'}).removeClass('ps-4 pe-1');
    general.showElements([displayCategories,menuIcon]);
    displayDataClass.getCategories(displayCategories);
})

$("#areaLink").click(function(e){
    e.preventDefault();
    $('.mainNav').css({'width':'0px','opacity':'0'}).removeClass('ps-4 pe-1');
    general.hideElements([displayMeals,closeMenuIcon,displayCategories,mealDetails,displayIngredients,search,noResults]);
    general.showElements([displayAreas,menuIcon]);
    displayDataClass.getAreas(displayAreas);
})

$("#ingredientsLink").click(function(e){
    e.preventDefault();
    $('.mainNav').css({'width':'0px','opacity':'0'}).removeClass('ps-4 pe-1');
    general.hideElements([displayMeals,closeMenuIcon,displayCategories,mealDetails,displayAreas,search,noResults]);
    general.showElements([displayIngredients,menuIcon]);
    displayDataClass.getIngredients(displayIngredients);
})

$("#searchLink").click(function(e){
    e.preventDefault();
    $('.mainNav').css({'width':'0px','opacity':'0'}).removeClass('ps-4 pe-1');
    general.hideElements([displayMeals,closeMenuIcon,displayCategories,mealDetails,displayAreas,displayIngredients,noResults]);
    general.showElements([search,menuIcon]);
    $('#searchByName').val("");
    $('#searchByFirstLetter').val("");

});

$('#searchByName').keyup(function(e){
    displayMeals.innerHTML='';
    const searchKey=e.target.value;
    general.hideElements([displayCategories,mealDetails,displayAreas,displayIngredients]);
    displayDataClass.getMealsByName(searchKey);
})


