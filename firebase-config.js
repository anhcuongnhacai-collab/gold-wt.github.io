// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getDatabase, ref, push, onValue, set, get } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAh0hpuNtXrqJZbFLH7Bs6A7vUo73sEqIU",
  authDomain: "goldwt123.firebaseapp.com",
  databaseURL: "https://goldwt123-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "goldwt123",
  storageBucket: "goldwt123.appspot.com",
  messagingSenderId: "340852437228",
  appId: "1:340852437228:web:e64444db949896d69a35c9"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, onValue, set, get };