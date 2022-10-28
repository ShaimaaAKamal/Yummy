

export class getData{

    async  getDatafun(url){
        const response=await fetch(url);
        const apiMeals=await response.json();
        return apiMeals;
       }

    
    getIngredients(mealDetails,mealIngredients){
        for(let i=1 ;i<=20 ; i++){
          if(mealDetails[`strIngredient${i}`] && mealDetails[`strIngredient${i}`] !== ' ')
           {let ingred;
             if(mealDetails[`strMeasure${i}`] && mealDetails[`strMeasure${i}`] !== ' ')
                 ingred=`${mealDetails[`strMeasure${i}`]} ${mealDetails[`strIngredient${i}`]}`;
             else
              ingred=mealDetails[`strIngredient${i}`];
             mealIngredients.push(ingred);
           }
        }
        return mealIngredients;
      }

    
}