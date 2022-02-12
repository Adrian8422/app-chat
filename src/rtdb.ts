import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "xgiMGeSWRE8dYbgHr2T8QZNSvyI1uqtN7PZLYcu8",
  databaseURL: "https://apx-dwf-m6-a6750-default-rtdb.firebaseio.com/",
  authDomain: "apx-dwf-m6-a6750.firebaseapp.com",
});

const rtdb = firebase.database();

export { rtdb };