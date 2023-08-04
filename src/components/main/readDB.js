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
  const [array, setArray] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    //load history

    auth.onAuthStateChanged((user) => {
      if (user != null) {
        const userId = user.uid;
        const db = getDatabase();
        const historyRef = ref(db, "users/" + userId);
        onValue(historyRef, (snapshot) => {
          const newArray = [];
          snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            newArray.push(childData.note);
            console.info(childData);
          });
          setArray(newArray);
        });
      }
    });
  }, []);

  useEffect(() => {
    setContent(
      <div>
        {array.map((note) => (
          <li class="list-group-item">{note}</li>
        ))}
      </div>
    );
  }, [array]);

  return (
    <div>
      <ul class="list-group list-group-flush">{content}</ul>
    </div>
  );
}

export function HandleDB() {
  //show DB and give it over to the handle function
  const [value, setValue] = useState("");

  useEffect(() => {
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
          var databaseArray = [];
          snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            databaseArray.push(childData.note);
            console.info(childData);
            console.info(childKey);
          });
          console.log(databaseArray);
          let sum = databaseArray.reduce((acc, curr) => acc + Handle(curr), 0);
          console.log("before Function", sum);
          setValue(sum);
        });
      }
    });
  }, []);
  return (
    <div>
      <h2 class="text-center">Euro : {value}</h2>
      <br />
    </div>
  );
}
