import { Validation } from "./validation.js";
import { General } from "./generalModules.js";
const validate=new Validation();
const general =new General();

export class HandleContact{
     handleName(input){
        this.handle(input,validate.validateName,'#name');

   }
     handleEmail(input){
        this.handle(input,validate.validateMail,'#email');

   }
   handlePhone(input){
    this.handle(input,validate.validatePhone,'#phone');
   }
   handleAge(input){
    this.handle(input,validate.validateAge,'#age');
   }
   handlePassword(input,elementSelector){
    this.handle(input,validate.validatePassword,elementSelector);
   }

   handle(input,func,selector){
    const siblings=$(selector).nextAll();
    if(func(input.value)){
        if(selector ==='repassword' && input.value !== $('#password').val()){
            this.displayInValidMessage(siblings,input);
            return;
        }
       this. displayValidMessages(siblings,input)
    }
    else{
        this.displayInValidMessage(siblings,input);
    }
   }

   displayInValidMessage(siblings,input){
         general.showElements([siblings[1],siblings[2]]);
        general.hideElements([siblings[0]]);
        input.style.borderColor='#f00';
   }

   displayValidMessages(siblings,input){
     general.hideElements([siblings[1],siblings[2]]);
     general.showElements([siblings[0]]);
     input.style.borderColor='#0f0';
   }
   
}
