import { Validation } from "./validation.js";
import { General } from "./generalModules.js";
const validate=new Validation();
const general =new General();

export class HandleContact{
     handleName(input){
     const siblings=$('#name').nextAll();
     if(validate.validatName(input.value)){
        general.hideElements([siblings[1],siblings[2]]);
        general.showElements([siblings[0]]);
        input.style.borderColor='#0f0';
     }
     else{
      general.showElements([siblings[1],siblings[2]]);
      general.hideElements([siblings[0]]);
      input.style.borderColor='#f00';
     }
   }
   handleEmail(input){
    const siblings=$('#email').nextAll();
    if(validate.validateMail(input.value)){
       general.hideElements([siblings[1],siblings[2]]);
       general.showElements([siblings[0]]);
       input.style.borderColor='#0f0';
    }
    else{
     general.showElements([siblings[1],siblings[2]]);
     general.hideElements([siblings[0]]);
     input.style.borderColor='#f00';
    }
  }
}
