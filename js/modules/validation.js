export class Validation{
    validatName(name){
        const regex=/^[a-zA-z]+$/;
       return regex.test(name);
    }
    validateMail(mail){
        const regex=/^[a-zA-z][a-zA-Z0-9._]{2,}@(gmail|hotmail|yahoo)\.[a-z]{2,3}$/;
        return regex.test(mail);
    }
}