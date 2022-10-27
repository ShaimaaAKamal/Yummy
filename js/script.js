import {navAnimation} from './modules/navModule.js';
import { CreateElements } from './modules/createModules.js';

navAnimation();
const create=new CreateElements();
const displayReceipes=document.querySelector('#displayReceipes');
create.createMeal('pizza','images/logo.png');



