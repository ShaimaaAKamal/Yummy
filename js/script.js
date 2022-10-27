import {navAnimation} from './modules/navModule.js';
// import { getData } from './modules/getData.js';
import { displayData } from './modules/displayData.js';

const displayDataClass=new displayData();
// const getDataClass=new getData();
const displayMeals=document.querySelector('#displayMeals');
const displayCategories=document.querySelector("#displayCategories");

navAnimation();
displayDataClass.getMealsByCategory('chicken',displayMeals);

$("#categoriesLink").click(function(e){
    e.preventDefault();
    displayMeals.classList.add('d-none');
    displayCategories.classList.remove('d-none');
    $('.mainNav').addClass('d-none');
    $('#menuIcon').removeClass('d-none');
    $('#closeMenuIcon').addClass('d-none');
    displayDataClass.getCategories(displayCategories);
})