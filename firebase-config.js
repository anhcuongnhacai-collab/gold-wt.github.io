// firebase-config.js
// --------------------------
// Import các hàm cần thiết từ Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getDatabase, ref, push, onValue, set, get } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";

// ===========================
// Cấu hình Firebase (thay bằng config của bạn)
// ===========================
const firebaseConfig = {
  apiKey: "AIzaSyARRhfDvEterUOjMnCdjMuV0pRRt4OFrYI",
  authDomain: "goldwt1-f597e.firebaseapp.com",
  databaseURL: "https://goldwt1-f597e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "goldwt1-f597e",
  storageBucket: "goldwt1-f597e.firebasestorage.app",
  messagingSenderId: "301134547289",
  appId: "1:301134547289:web:59c2bead386d343bb2e448"
};

// ===========================
// Khởi tạo Firebase app
// ===========================
const app = initializeApp(firebaseConfig);

// ===========================
// Khởi tạo Database
// ===========================
const db = getDatabase(app);

// ===========================
// Export để các file khác import
// ===========================
export { db, ref, push, onValue, set, get };