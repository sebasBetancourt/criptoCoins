import { points } from "./animation.js";
import { bseDatos } from "./bseDatos.js";
import {findDataByForm} from "./formSignIn.js";

points()


const form__login = document.querySelector("#form__login");
const dialog__login = document.querySelector("#dialog__login");
const dialog__login_close = document.querySelector("#dialog__login_close");




form__login.addEventListener("submit", findDataByForm) // Al dar click al boton de formularion se ejecuta la funcion findDataByForm
dialog__login_close.addEventListener("click", (e) => dialog__login.close() ) // Al dar click a icono x del dialogo lo cierra 