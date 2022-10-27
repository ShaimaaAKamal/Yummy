export class CreateElements{
     createElement(element,attributes,text=''){
        const elemName=document.createElement(element);
        if(Object.keys(attributes).length !== 0)
             this.setAttr(elemName,attributes);
        if(text)
           this.addInnerText(elemName,text)
        return elemName;
    }
    
     setAttr(element,attributes){
       Object.keys(attributes).forEach(key => 
        element.setAttribute(key,attributes[key]));
    }
    
     addInnerText(element,text){
        element.append(text);
     }
    
     createMeal(mealName,mealImg)
    {
       const h2=this.createElement('h2',{class:'text-center'},mealName)
       const div=this.createElement('div',{class:"mealName rounded-3"},h2);
       const img=this.createElement('img',{src:mealImg,alt:mealName,class:'w-100 rounded-3'});
       const mealCard=this.createElement('div',{class:"position-relative mealCard"});
       mealCard.appendChild(img)
       mealCard.appendChild(div);
       const colDiv=this.createElement('div',{class:"col-lg-3 col-md-6"});
       colDiv.appendChild(mealCard);
       return colDiv ;
    }
    
}