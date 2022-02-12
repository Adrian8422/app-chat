import { state } from "../state";

type Message = {
  from: string;
  message: string;
};

class ChatPage extends HTMLElement {
  connectedCallback() {
    state.subscribe(() => {
      const cs = state.getState();
      this.messages = cs.messages;
      this.render();
    });
    this.render();
  }
  addListeners() {
    const formNewMsj = this.querySelector(".submit-message");
    formNewMsj.addEventListener("submit", (e: any) => {
      e.preventDefault();
      const target = e.target as any;
      state.pushMessage(target["new-message"].value);
    });
  }
  addStylesMsg() {
    const containerMessages = this.querySelector(".messages");

    containerMessages.setAttribute(
      "style",
      `    display: flex;
      overflow: auto;
      margin: 20px 0px;
      grid-row-start: 4;
      max-height: 470px;
      grid-column-start: 2;
      flex-direction: column;
      max-height: 445px;
      background-color: #f0f4f89c;
      border-radius: 4px;
      position: sticky;
      `
    );
    ///Dejo el scroll fijo en ultimo msg
    containerMessages.scrollTop = containerMessages.scrollHeight;
    ///Mapeo mensajes para aplicarle estilos
    this.messages.map((message) => {
      if (message.from == state.data.fullName) {
        const messages = this.querySelectorAll(".message");
        const from = this.querySelectorAll(".from");
        messages.forEach((ImMsg) => {
          ImMsg.setAttribute(
            "style",
            "background-color:#97ed87;display:flex;align-self:self-end;box-shadow: rgb(0 0 0 / 15%) 5px 4px 7px;font-family: open sans; border-radius:6px;font: -webkit-small-control;"
          );
        });
        from.forEach((fromMsg) => {
          fromMsg.setAttribute(
            "style",
            "background-color:#97ed87;display:flex;align-self:self-end;font-size:10px;box-shadow: rgb(0 0 0 / 15%) 5px 4px 7px;padding: 4px;margin-bottom: 1px;border-radius:6px;"
          );
        });
      }
      if (message.from != state.data.fullName) {
        ///IF SI EL FROM  NO ES !== SI NO ES EL DEL STATE QUE SE GUARDE EN OTRA ETIQUETA
        const messages = this.querySelectorAll(".message-other");
        const from = this.querySelectorAll(".from-other");
        messages.forEach((otherMsg) => {
          otherMsg.setAttribute(
            "style",
            "background-color:rgb(229, 226, 226);box-shadow: rgb(0 0 0 / 15%) 5px 4px 7px;align-self: self-start;font-family:open sans;border-radius:6px;font: -webkit-small-control;"
          );
        });
        from.forEach((otherMsg) => {
          otherMsg.setAttribute(
            "style",
            "background-color:rgb(229, 226, 226);font-size:10px;box-shadow: rgb(0 0 0 / 15%) 5px 4px 7px;align-self: self-start;padding: 4px;margin-bottom: 1px;border-radius:6px;"
          );
        });
      }
    });
  }

  messages: Message[] = [];
  render() {
    const style = document.createElement("style");
    style.innerHTML = `
    .chat-container {
      width:100%;
      font-size: 16px;
        font-family: 'Russo One', sans-serif;
        
       
    }
    .room-id {
      grid-column-start: 1;
      grid-column-end: 3;
      grid-row-start: 3;
      margin: 0px;
      font-size: 18px;
      width: 156px;
      border-radius: 21px;
   }
  .submit-message {
    display: grid;
    gap: 18px;
  }
  .message-container {
    display: flex;
    width: 100%;
    margin: 5px 0px;
    align-self: flex-end;
    flex-direction: column;
    /* align-items: self-end;
  }
 
  .message{
    display: flex;
    align-self: self-end;
    background-color: rgb(65, 177, 65);
    align-items: flex-end;
    width: 43vh;
   
  }


    
    `;
    this.innerHTML = `
    <div class="chat-container">
    <header-vue> Chat Page </header-vue>
    <h2 class="chat-title">Bienvenidx cliente: ${state.data.fullName}</h2>
    <h3 class="room-id">Room id: ${state.data.roomId}</h3>
   

    <div class="messages">
        ${this.messages
          .map((m) => {
            if (m.from == state.data.fullName) {
              return `<div class="message-container">
              <div class="from"> ${m.from} </div> <div class="message"> ${m.message} </div>
                  </div>`;
            }

            if (m.from != state.data.fullName) {
              ///IF SI EL FROM  NO ES !== SI NO ES EL DEL STATE QUE SE GUARDE EN OTRA ETIQUETA
              return `<div class="message-container">
                <div class="from-other"> ${m.from} </div> <div class="message-other"> ${m.message} </div>
                    </div>`;
            }
          })
          .join("")}
            </div>
            <form class="submit-message">
                <input type="text" class="new-message" name="new-message" placeholder="Escriba un mensaje aqui"/>
                <button class="button"> Enviar </button>
            </form>
        </div>
        
        
      
        `;
    this.appendChild(style);
    this.addListeners();
    this.addStylesMsg();
  }
}
customElements.define("chat-page", ChatPage);