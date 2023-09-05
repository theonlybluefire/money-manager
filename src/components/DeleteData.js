
//import
//React, Bootstrap
import React, { useState, useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../node_modules/bootstrap/dist/js/bootstrap.js";
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
  remove
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
//components
import DismissibleExample from "./main/Toast";
//firebase
const firebaseConfig = {
  apiKey: "AIzaSyBgoMjqs2soEsMlcgb3AztqjoDQuD5Dly8",
  authDomain: "moneyapp-5f530.firebaseapp.com",
  projectId: "moneyapp-5f530",
  storageBucket: "moneyapp-5f530.appspot.com",
  messagingSenderId: "800356072567",
  appId: "1:800356072567:web:b32b2359111e2acc761a72",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();

//func
export const DeleteData = () => {
  const [showToast, setshowToast] = useState('')
  const showToastFunc = () => setshowToast(<DismissibleExample message='Ihre noten wurden erfolgreich gelöscht'/>)
  const Del = () => {
    auth.onAuthStateChanged((user) => {
      if (user != null) {
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        const userId = user.uid;
        const db = getDatabase();
        //del data
        const dbRef = ref(db, "users/" + userId);
        remove(dbRef)
        .then(() => {
            console.log('Data under UID',userId,' deleted successfully.');
            showToastFunc();
          })
        .catch((error) => {
          console.error('Error deleting data:', error);
        });
      } else {
        console.log("Not logged in ");
      }
    });
  };
  return (
    <div>
      <button class="btn btn-danger col-12" onClick={Del}>
        Delete Data
      </button>
      {showToast}
    </div>
  );
};
