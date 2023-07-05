import React, { useState, useEffect } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
  import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
  //components
 import RenderArray from '../RenderArray';
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
      appId: "1:800356072567:web:b32b2359111e2acc761a72"
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();



const LoadHistory = () => {
  //load history
  function load() {
    
    auth.onAuthStateChanged(user => {
      if (user != null) {
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        const userId = user.uid;

        const db = getDatabase();
        const historyRef = ref(db, 'users/' + userId);
        onValue(historyRef, (snapshot) => {
          const data = snapshot.val();
          console.log('test')
          localStorage.setItem('data', JSON.stringify(data));
          console.log(Object.keys(JSON.parse(localStorage.getItem('data'))).map((key) => JSON.parse(localStorage.getItem('data'))[key].note))
        })
      }
    })}




load();
console.log(JSON.parse(localStorage.getItem('data')))



    return (
      <div>
        <RenderArray arrayToRender={JSON.parse(localStorage.getItem('data'))}/>
      </div>
    )
}

export default LoadHistory

