// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCS42ywYL5MBfkPtit1OkoNs9tkBjRVarI",
  authDomain: "gold-wt.firebaseapp.com",
  projectId: "gold-wt",
  storageBucket: "gold-wt.firebasestorage.app",
  messagingSenderId: "89848178654",
  appId: "1:89848178654:web:4e9ae1c49a42baff221f4f",
  measurementId: "G-5L7PCHEX7H"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Database
export const db = getDatabase(app);