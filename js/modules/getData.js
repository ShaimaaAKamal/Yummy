

export class getData{

    async  getDatafun(url){
        const response=await fetch(url);
        const apiMeals=await response.json();
        return apiMeals;
       }

    
}