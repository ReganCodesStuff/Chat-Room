import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANm72RQCzkeIcnoS6SwzVK7_-FjqEmC7Y",
  authDomain: "udemy-modern-javascript-6022b.firebaseapp.com",
  projectId: "udemy-modern-javascript-6022b",
  storageBucket: "udemy-modern-javascript-6022b.appspot.com",
  messagingSenderId: "426844885242",
  appId: "1:426844885242:web:13d4d5d0ae1520d5603943",
  measurementId: "G-STYN7LSCP3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
