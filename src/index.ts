
import "./components/header";
import "./components/form";
import "./components/signup";
import "./pages/welcome-form";
import "./pages/chat-page";
import { state } from "./state";
import "./router";

(() => {
  state.init();
})();
// HACERLO DESDE LA MAC PARA QUE FUNCIONE BIEN PARCEL, DEJAR CORRIENDO EL PUERTO QUE ME DA DESDE EL SRC Y UUTILIZAR EL PUERTO 3000 O EL QUE ME DA LA API PARA PODER UTILIZAR TAMBIEN LA API PORQUE SINO ENTTRA EN CONFLICTOS DE PUERTOS, EN DEFINITIVA ULTILIZAR LA CARPETA DIST PARA TODO 