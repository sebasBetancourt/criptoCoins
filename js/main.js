import { points } from "./animation.js";
import { bseDatos } from "./bseDatos.js";
import {findDataByForm} from "./formSignIn.js";
import { dialogRegister } from "./dialogRegister.js";


dialogRegister();
points()

const form__login = document.querySelector("#form__login");




form__login.addEventListener("submit", findDataByForm) 