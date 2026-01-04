import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5Y9UPHhcxbNrpAG5Y03fA9mzBG7Ad4CY",
  authDomain: "schoonmaakrooster-39eb6.firebaseapp.com",
  projectId: "schoonmaakrooster-39eb6",
  storageBucket: "schoonmaakrooster-39eb6.firebasestorage.app",
  messagingSenderId: "557682752040",
  appId: "1:557682752040:web:cb8e512d3c918119b9531d",
  measurementId: "G-S005DQ51T7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
