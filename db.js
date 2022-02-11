"use strict";
exports.__esModule = true;
exports.rtdb = exports.firestore = void 0;
var admin = require("firebase-admin");
var serviceAccount = require("./key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://apx-dwf-m6-a6750-default-rtdb.firebaseio.com"
});
var firestore = admin.firestore();
exports.firestore = firestore;
firestore.settings({ ignoreUndefinedProperties: true });
var rtdb = admin.database();
exports.rtdb = rtdb;
