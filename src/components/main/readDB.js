import React, { useState, useEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
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
  onValue,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
//components
import RenderArray from "../RenderArray";
import Handle from "../Handle";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//firebase
// Your web app's Firebase configuration
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

export function ShowDB() {
  const array = []; //über den Funktion Scope kommen
  const DBData = []; //Array für die Handle Funktion um alles zusammennzurechnen
  const [content, setContent] = useState("");
  useEffect(() => {
    //load history

    auth.onAuthStateChanged((user) => {
      if (user != null) {
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        const userId = user.uid;
        const db = getDatabase();
        const historyRef = ref(db, "users/" + userId);
        onValue(historyRef, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            array.push(childData.note);
            console.info(childData);
            console.info(childKey);
          });
        });
        console.log(array);
        setContent(
          <div>
            {array.map((note) => (
              <div className="user">{note}</div>
            ))}
          </div>
        );
      }
    });
  }, []);
  return <div>{content}</div>;
}

export function HandleDB() {
  //show DB and give it over to the handle function
  const [value, setValue] = useState("");
  const databaseArray = [];
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      let sum = 0; //set Sum null
      if (user != null) {
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        const userId = user.uid;
        const db = getDatabase();
        const historyRef = ref(db, "users/" + userId);
        onValue(historyRef, (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            databaseArray.push(childData.note);
            console.info(childData);
            console.info(childKey);
          });
          let sum = 0; //set Sum null
          for (let i = 0; i < databaseArray.length; i++) {
            sum += Handle(databaseArray[i]);
            console.log("Durchlauf", i, "Wert", sum);
          }
          console.log("before Function", sum);
          setValue(sum);
        });
      }
    });
  }, []);
  return (
    <div>
      <h2 class="text-centere">Euro : {value}</h2>
      <br />
    </div>
  );
}
