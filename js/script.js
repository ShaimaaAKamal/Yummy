import {navAnimation} from './modules/navModule.js';
import { displayData } from './modules/displayData.js';
import { General } from './modules/generalModules.js';
import { HandleContact } from './modules/contact.js';

const displayDataClass=new displayData();
const handleContact=new HandleContact();
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
const lengthError=document.querySelector('#lengthError');
const contact=document.querySelector('.contact');

navAnimation();
displayDataClass.getMealsByCategory('chicken',displayMeals);

$("#categoriesLink").click(function(e){
    e.preventDefault();
    general.hideElements([displayMeals,closeMenuIcon,mealDetails,displayAreas,displayIngredients,search,noResults,contact]);
    $('.mainNav').css({'width':'0px','opacity':'0'}).removeClass('ps-4 pe-1');
    general.showElements([displayCategories,menuIcon]);
    displayDataClass.getCategories(displayCategories);
})

$("#areaLink").click(function(e){
    e.preventDefault();
    $('.mainNav').css({'width':'0px','opacity':'0'}).removeClass('ps-4 pe-1');
    general.hideElements([displayMeals,closeMenuIcon,displayCategories,mealDetails,displayIngredients,search,noResults,contact]);
    general.showElements([displayAreas,menuIcon]);
    displayDataClass.getAreas(displayAreas);
})

$("#ingredientsLink").click(function(e){
    e.preventDefault();
    $('.mainNav').css({'width':'0px','opacity':'0'}).removeClass('ps-4 pe-1');
    general.hideElements([displayMeals,closeMenuIcon,displayCategories,mealDetails,displayAreas,search,noResults,contact]);
    general.showElements([displayIngredients,menuIcon]);
    displayDataClass.getIngredients(displayIngredients);
})

$("#searchLink").click(function(e){
    e.preventDefault();
    $('.mainNav').css({'width':'0px','opacity':'0'}).removeClass('ps-4 pe-1');
    general.hideElements([displayMeals,closeMenuIcon,displayCategories,mealDetails,displayAreas,displayIngredients,noResults,lengthError,contact]);
    general.showElements([search,menuIcon]);
    $('#searchByName').val("");
    $('#searchByFirstLetter').val("");
    localStorage.removeItem('meals');

});

$("#contactLink").click(function(e){
    e.preventDefault();
    $('.mainNav').css({'width':'0px','opacity':'0'}).removeClass('ps-4 pe-1');
    general.hideElements([displayMeals,closeMenuIcon,displayCategories,displayIngredients,mealDetails,displayAreas,search,noResults]);
    general.showElements([contact,menuIcon]);
    $('#name').keyup((e)=>handleContact.handleName(e.target)).blur(e=> e.target.style.color='#fff');
    $('#email').keyup((e)=>handleContact.handleEmail(e.target)).blur(e=> e.target.style.color='#fff');
    $('#phone').keyup((e)=>handleContact.handlePhone(e.target)).blur(e=> e.target.style.color='#fff');
    $('#age').keyup((e)=>handleContact.handleAge(e.target)).blur(e=> e.target.style.color='#fff');
    $('#password').keyup((e)=>handleContact.handlePassword(e.target,'#password')).blur(e=> e.target.style.color='#fff');
    $('#repassword').keyup((e)=>handleContact.handlePassword(e.target,'#repassword')).blur(e=> e.target.style.color='#fff');
})


$('#searchByName').keyup(function(e){
    handleSearch(e,'name');
})
$('#searchByFirstLetter').keyup(function(e){
    noResults.classList.add('d-none');
    handleSearch(e,'letter');
})

function handleSearch(e,key){
    displayMeals.innerHTML='';
    const searchKey=e.target.value;
    general.hideElements([displayCategories,mealDetails,displayAreas,displayIngredients,contact]);
    (key=== 'name')? displayDataClass.getMealsByName(searchKey):displayDataClass.getMealsByletter(searchKey)
}


