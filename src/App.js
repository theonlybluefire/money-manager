import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
//components
import IfLoggedIn from "./components/IfLoggedIn";
import HandleLogin from "./components/HandleLogin";
import "./index.css";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgoMjqs2soEsMlcgb3AztqjoDQuD5Dly8",
  authDomain: "moneyapp-5f530.firebaseapp.com",
  projectId: "moneyapp-5f530",
  storageBucket: "moneyapp-5f530.appspot.com",
  messagingSenderId: "800356072567",
  appId: "1:800356072567:web:b32b2359111e2acc761a72",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
function App() {
  return <IfLoggedIn />;
}
export default App;
