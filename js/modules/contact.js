import { Validation } from "./validation.js";
import { General } from "./generalModules.js";
const validate=new Validation();
const general =new General();
let count=0

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
    if(elementSelector === '#repassword') count++;
    this.handle(input,validate.validatePassword,elementSelector);
   }
   checkPassowrd(){
      const password=$(`#password`).val();
      const repassword=$(`#repassword`).val();
      const repaswordSiblings=$('#repassword').nextAll();
      const repasswordInput=document.querySelector('#repassword');
      if(count !=0){
            if(password !== repassword){
                this.displayInValidMessage(repaswordSiblings,repasswordInput);
                return false;
                }
              if(validate.validatePassword(repassword)){
                this.displayValidMessages(repaswordSiblings,repasswordInput);
              }
              else this.displayInValidMessage(repaswordSiblings,repasswordInput);

      }
   
      return true;
   }


   handle(input,func,selector){
    const siblings=$(selector).nextAll();
    if(func(input.value)){
       if(selector === '#repassword'){
         this.checkPassowrd(); return;
       }
       if(selector === '#password'){
        this.checkPassowrd();
      }
       
       this.displayValidMessages(siblings,input)
    }
    else{
        if(selector === '#password'){
            this.checkPassowrd();
          }
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
