import * as admin from"firebase-admin"
const serviceAccount = require("./key.json")


admin.initializeApp({
  credential:admin.credential.cert(serviceAccount as any),
  databaseURL :"https://apx-dwf-m6-a6750-default-rtdb.firebaseio.com"
})
const firestore = admin.firestore()
firestore.settings({ignoreUndefinedProperties:true})

const rtdb = admin.database()

export {firestore,rtdb}