import { state } from "../../state";
 const imgClose = require("url:../../assets/close-img-menu.png");
class SignUpEl extends HTMLElement {
  connectedCallback() {
    this.render();
    const cs = state.getState();
    const form = this.querySelector(".submit");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;

      state.setEmailAndFullName(target.email.value, target.nombre.value);
      state.setState(cs);
      state.signUp(() => {});
    });
    const menuSignUpActive = this.querySelector(".registrarme-a");
    menuSignUpActive.addEventListener("click", () => {
      const formSignUp = this.querySelector(".container-form-sign-up");
      formSignUp.setAttribute("style", "display:inherit");
    });
    const closeWindow = this.querySelector(".img-close");
    closeWindow.addEventListener("click", () => {
      const registerEl = this.querySelector(".container-form-sign-up");
      registerEl.setAttribute("style", "display:none");
    });
    const button = this.querySelector(".button");
    button.addEventListener("click", () => {
      const registerEl = this.querySelector(".container-form-sign-up");
      registerEl.setAttribute("style", "display:none");
    });
  }
  render() {
    const style = document.createElement("style");
    style.innerHTML = `

    .container-form-sign-up{
      display: none;
      background-color: rgb(24 36 39);
      font-family: 'Russo One', sans-serif;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: whitesmoke;
      font-size: 18px;
      border-radius: 8px;
      /* width: 100%; */
      position: fixed;
      top: 28px;
      right: 78px;
      left: 82px;
      box-shadow: rgb(0 0 0 / 63%) 7px 7px 6px;
    }


    .label-signup{
      font-size: 20px;
      width: 100%;
      height: 30px;
      border-radius: 4px;
      font-family: 'Russo One', sans-serif;
    }


    .input{
      width:100%;
      border-radius: 4px;
    }
    .container-img{
      display: flex;
      flex-direction: row;
      justify-content: end;
    }
    .img-close {
      display: flex;
      width: 60px;
      height: 60px;
      align-items: flex-end;
    }
    .submit{
      display: flex;
      flex-direction:column;
    }
    .button{
      width: 150px;
      border-radius: 4px;
      font-weight: 500;
    }
    .container-button{
      display: flex;
      flex-direction: row;
      justify-content: end;

    }


    `;
    this.innerHTML = `
    <div>
    <h2 class="sign-up-title">Ya estas registrado? Sino<a class="registrarme-a"  href="">Registrarme</a></h2>
    </div>
        <div class="container-form-sign-up">

         <div class="container-img">
           <img class="img-close" src="${imgClose}" alt="" />
        </div>
         <form class="submit">
         <label class="label-signup" for="email">Email</label>
         <div>
           <input class="input" type="email" name="email">
         </div>
           <label class="label-signup" for="nombre">Nombre</label>
         <div>
           <input class="input" type="text" name="nombre">
         </div>

         <div class="container-button">
           <button class="button">Registrarme</button>
          </div>
         </form>
        </div>


        `;
    this.appendChild(style);
  }
}
customElements.define("sign-up", SignUpEl);
 