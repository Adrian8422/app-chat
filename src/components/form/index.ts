import { state } from "../../state";
import { Router } from "@vaadin/router";

class Form extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  connectedCallback() {
    this.render();
    state.init();
    const style = document.createElement("style");
    style.innerHTML = `
    
    .form{
      width:100%;
        display: grid;
        gap:15px;
        height:600px;

    }
    .label{
      padding:0;
      font-size: 20px;
      width: 100%;
      height: 39px;
      border-radius: 4px;
      font-family: 'Russo One', sans-serif;


    }
    .input{
        font-size: 20px;
        width: 100%;
        height: 55px;
        border-radius: 4px;


    }
    .input-room{
        font-size: 20px;
        width: 100%;
        height: 55px;
        border-radius: 4px;
        display:none;

        
    }
    .select-label{
        font-size: 24px;
        width: 100%;
        height: 55px;
        border-radius: 4px;
        
    }
    .button-el{
      font-size: 20px;
      width: 100%;
      height: 55px;
      border-radius: 4px;
      background-color:rgb(3, 44, 56);
      color:whitesmoke;
      

    }
    
    
    `;
    this.appendChild(style);
  }
  addListeners() {
    state.init();
    const currentState = state.getState();
    const form = this.querySelector(".form");
    const inputEl: any = this.querySelector(".input-room");
    const selectOptionsValue: any = this.querySelector(".select-label");

    selectOptionsValue.addEventListener("change", () => {
      const valoresSelect =
        selectOptionsValue.options[selectOptionsValue.selectedIndex].value;
      if (valoresSelect == "room-existente") {
        inputEl.setAttribute("style", "display:inherit");
      } else {
        inputEl.setAttribute("style", "display:none");
      }
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      const date = new FormData(target);
      const valoresSelect =
        selectOptionsValue.options[selectOptionsValue.selectedIndex].value;
      // const object = Object.fromEntries(date.entries());
      state.setEmailAndFullName(target.email.value, target["full-name"].value);
      state.signIn((err) => {
        if (valoresSelect == "room-existente") {
          console.log("accedi a room existente");
          state.data.roomId = (inputEl as HTMLInputElement).value.toString();
          state.setState(currentState);

          state.accessToRoom(state.data.roomId);
          state.setState(currentState);
        } else {
          console.log("accediendo a ask new room");
          state.askNewRoom(() => {
            state.setState(currentState);
            state.accessToRoom(state.data.roomId);
          });
        }
      });
      Router.go("chat");
    });

  }
  render() {
    this.innerHTML = `
    
    
    <form class="form">
      <div>
        <label class="label">Email</label>
        <input class="input" type="email" name="email" />
      </div>
      <div>
        <label class="label">Nombre</label>
        <input class="input" type="text" name="full-name"/>
      </div>
      <div>
        <label class="label">Room</label>
        <select class="select-label">
          <option class="input" value="nuevo-room">Nuevo room</option>
          <option class="room-existentex" class="input" value="room-existente">Room existente</option>
        </select>
      </div>
      <div>
        
        <input class="input-room" type="text" placeholder="Ingrese su ID de Sala ej:1234" name="" />
      </div>
      <button class="button-el">Comenzar</button>
    </form>
    
    
    
    `;
    this.addListeners();
  }
}
customElements.define("form-elem", Form);