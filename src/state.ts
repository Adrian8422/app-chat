const API_BASE_URL = "http://localhost:3000";
import { rtdb } from "./rtdb";
import map from "lodash/map";
const state = {
  data: {
    email: "",
    fullName: "",
    userId: "",
    roomId: "",
    rtdbRoomId: "",
    error: "",

    messages: ([] = []),
  },
  listeners: [],
  init() {
    const localData = localStorage.getItem("state");
    if (localData !== null) {
    }

    // state.setState(JSON.parse(localData));
  },
  signUp(callback) {
    const cs = this.getState();
    const fullName = cs.fullName;
    const email = cs.email;
    fetch(API_BASE_URL + "/signup", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        fullName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        cs.userId = data.id;
        this.setState(cs);
      });
    callback();
  },
  listenRoom() {
    ///SOLUCIONAR PARA PORDER LEER MENSAjES
    const currentState = this.getState();
    console.log("listen toroom");
    ///ACTIVAR ESTE METODO LISTENROOM PARA VER MESSAGES
    const chatroomsRef = rtdb.ref(`/rooms/${currentState.rtdbRoomId}`);
    console.log(chatroomsRef);

    chatroomsRef.on("value", (snapshot) => {
      const messageFromSv = snapshot.val();
      console.log(messageFromSv.messages);
      const messageList = map(messageFromSv.messages);

      currentState.messages = messageList;
      this.setState(currentState);
    });
  },

  ////FIJARME VIDEO RESOLUCION MINUTO 60 PARA VER COMO MOSTRAR LOS MENSAJES EN LA UI

  pushMessage(messages: string) {
    const cs = this.getState();
    const nombreState = this.data.fullName;
    fetch(API_BASE_URL + `/messages/${cs.rtdbRoomId}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: nombreState,
        message: messages,
      }),
    });
  },
  getState() {
    return this.data;
  },
  setEmailAndFullName(email: string, fullName: string) {
    const currentState = this.getState();
    currentState.email = email;
    currentState.fullName = fullName;
    this.setState(currentState);
  },
  signIn(callback?) {
    const currentState = this.getState();
    if (currentState.email) {
      fetch(API_BASE_URL + "/signin", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: currentState.email }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          currentState.userId = data.id;
          this.setState(currentState);
          console.log(currentState);
          callback();
          // callback();
        });
    } else {
      console.error("no hay email en state");
      callback(true);
    }
  },
  accessToRoom(incompleteRoomId, callback?) {
    const cs = this.getState();
    const userId = cs.userId;
    const roomId = incompleteRoomId.toString();

    if (cs.roomId && cs.userId) {
      fetch(API_BASE_URL + "/rooms/" + roomId + "?userId=" + userId)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("data retdbRoomid", data);
          cs.rtdbRoomId = data.rtdbRoomId;
          this.setState(cs);
          // console.log("userid and roomid", cs.userId, cs, roomId);
          this.listenRoom();
          if (callback) {
            callback;
          }
        });
    } else {
      console.error("error acces");
    }
  },
  askNewRoom(callback?) {
    const cs = this.getState();
    if (cs.userId) {
      fetch(API_BASE_URL + "/rooms", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId: cs.userId }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(
            "dadadad data de metodo asknewroom antes de setear",
            data
          );
          cs.roomId = data.id;
          this.setState(cs);
          console.log("el roomd id", cs.roomId);

          if (callback) {
            callback();
          }
        });
    } else {
      console.error("no hay userId en el state");
    }
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    console.log("cambio el state", this.data);
    localStorage.setItem("state", JSON.stringify(state.getState()));
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};
export { state };

