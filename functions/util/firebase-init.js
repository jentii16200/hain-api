/* eslint-disable */

const admin = require("firebase-admin");

const serviceAccount = require("./hain-402aa-firebase-adminsdk-iy0yz-d55386632e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
// Initialize Firebase

module.exports = { db, admin };
