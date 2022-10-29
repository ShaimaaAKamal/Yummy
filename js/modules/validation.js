export class Validation{
    validateName(name){
        const regex=/^[a-zA-z]+$/;
       return regex.test(name);
    }
    validateMail(mail){
        const regex=/^[a-zA-z][a-zA-Z0-9._]{2,}@(gmail|hotmail|yahoo)\.[a-z]{2,3}$/;
        return regex.test(mail);
    }
    validatePhone(phone){
        const regex=/^(\+2)?01(0|1|2|5)[0-9]{8}$/
        return regex.test(phone);
    }
    validateAge(age){
        const regex=/^[1-9][0-9]?0?$/
        return regex.test(age);
    }
    validatePassword(password){
        const regex=/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/
        return regex.test(password);
    }
}