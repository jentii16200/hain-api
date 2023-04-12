// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL,
} = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDny6UIXoFYN-5i1wG03DfZPC0QohJRlbc",
  authDomain: "hain-402aa.firebaseapp.com",
  projectId: "hain-402aa",
  storageBucket: "hain-402aa.appspot.com",
  messagingSenderId: "689954200164",
  appId: "1:689954200164:web:598341c4d5237c7c1ddd71",
  measurementId: "G-1SZSDD5WF0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

module.exports = {
  storage,
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL,
};
